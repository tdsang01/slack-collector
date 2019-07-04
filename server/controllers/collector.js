import Path from 'path';
import FS from 'fs';
import { get } from 'lodash';
import { channelRepo, messageRepo } from '../repositories';
import { SlackService } from '../services';
import { success } from '../helpers/response';
import { Message } from '../models';

export default class CollectorController {
    static async webhook(req, res, next) {
        try {
            const message = get(req, 'body.event');
            if (message) {
                const result = await messageRepo._create(message);
                console.log({result});
            }
            return res.status(200).json({
                challenge: req.body.challenge
            });
        } catch(e) {
            return next(e);
        }
    }

    static async collectChannelsFromApi(req, res, next) {
        success(res);
        console.log('start');
        let cursor = null;
        let i = 1;
        try {
            while (true) {
                console.log('start while: ', i);
                const responseData = await SlackService.getListChannels(cursor);
                if (!responseData.ok) {
                    console.error(responseData);
                    break;
                }
                await channelRepo._insertMany(responseData.channels);
                cursor = get(responseData, 'response_metadata.next_cursor');
                if (!cursor) {
                    break;
                }
                console.log('end while', i);
                i++;
            }
            console.log('done');
        } catch(e) {
            console.error(e);
        }
    }

    static async collectMessagesFromApi(req, res, next) {
        try {
            success(res);
            const channels = await channelRepo._getAll({
                select: 'id'
            });
            for (const channel of channels) {
                if (!channel.id) {
                    continue;
                }
                let cursor = null;
                let i = 1;
                while (true) {
                    console.log(`start ${channel.id} while ${i}`);
                    const responseData = await SlackService.getListMessages(channel.id, cursor);
                    if (!responseData.ok) {
                        break;
                    }
                    await messageRepo._insertMany(responseData.messages);
                    const listThreadTs = [];
                    for (const item of responseData.messages) {
                        if (item.thread_ts) {
                            listThreadTs.push(item.thread_ts);
                        }
                    }
                    await CollectorController.collectReplyMessagesFromApi(channel.id, listThreadTs);
                    console.log(`end ${channel.id} while ${i}`);
                    cursor = get(responseData, 'response_metadata.next_cursor');
                    if (!cursor) {
                        break;
                    }
                    i++;
                }
            }
        } catch(e) {
            console.error(e);
        }
    }

    static async collectReplyMessagesFromApi(channelId, listThreadTs) {
        try {
            let i = 1;
            let cursor = null;
            for (const ts of listThreadTs) {
                while (true) {
                    console.log('start replies while ', i);
                    const responseData = await SlackService.getListRepliesMessage(channelId, ts, cursor);
                    if (!responseData.ok) {
                        break;
                    }
                    if (Array.isArray(responseData.messages)) {
                        responseData.messages.shift();
                        await messageRepo._insertMany(responseData.messages);
                    }
                    console.log('end replies while ', i);
                    cursor = get(responseData, 'response_metadata.next_cursor');
                    if (!cursor) {
                        break;
                    }
                    i++;
                }
            }
        } catch (e) {
            console.error(e);
        }
    }

    static async collectChannelsFromFileExport(req, res, next) {
        try {
            success(res);
            const checkExistsChannel = await channelRepo._getOne();
            if (checkExistsChannel) {
                return;
            }
            const pathFile = Path.resolve(__dirname, '..', 'data', 'channels.json');
            const channels = require(pathFile);
            await channelRepo._insertMany(channels);
        } catch(e) {
            console.error(e);
        }
    }

    static async collectMessagesEachChannelFromFileExport(req, res, next) {
        try {
            success(res);
            const channel = await channelRepo._getOne({
                where: {
                    id: Message.DEFAULT_CHANNEL_ID,
                },
                select: 'id name'
            });
            if (!channel) {
                return;
            }
            const pathDir = Path.resolve(__dirname, '..', 'data', channel.name);
            console.log({pathDir});
            FS.readdir(pathDir, (e, fileNames) => {
                if (e) {
                    return;
                }
                for (const fileName of fileNames) {
                    const messages = require(`${pathDir}/${fileName}`);
                    messageRepo._insertMany(messages);
                }
            });
        } catch(e) {
            console.error(e);
        }
    }

    static async collectMessagesAllChannelFromFileExport(req, res, next) {
        try {
            success(res);
            const channels = await channelRepo._getAll({
                select: 'id name'
            });
            for (const channel of channels) {
                const pathDir = Path.resolve(__dirname, '..', 'data', channel.name);
                console.log({pathDir});
                FS.readdir(pathDir, async (e, fileNames) => {
                    if (e) {
                        return;
                    }
                    for (const fileName of fileNames) {
                        const messages = require(`${pathDir}/${fileName}`);
                        if (Array.isArray(messages)) {
                            const newMessages = messages.map(item => ({...item, channel: channel.id }));
                            await messageRepo._insertMany(newMessages);
                        }
                    }
                });
            }
        } catch(e) {
            console.error(e);
        }
    }

    static async getAll(req, res, next) {
        try {
             const results = await messageRepo._getAll({
                 sort: { ts: -1 }
             });
             return success(res, results);
        } catch(e) {
            return next(e);
        }
    }

    static async getAllByChannelId(req, res, next) {
        try {
            const results = await messageRepo._getAll({
                where: {
                    channel: req.params.id,
                    thread_ts: { $exists: false }
                },
                sort: { ts: -1 }
            });
            return success(res, results);
        } catch(e) {
            return next(e);
        }
    }
    
    static async getDetailMessage(req, res, next) {
        try {
             
        } catch(e) {
            return next(e);
        }
    }
}