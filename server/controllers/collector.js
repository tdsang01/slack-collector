import { get } from 'lodash';
import { channelRepo, messageRepo } from '../repositories';
import { SlackService } from '../services';
import { success } from '../helpers/response';

export default class CollectorController {
    static async collectChannels(req, res, next) {
        success(res);
        console.log('start');
        let cursor = null;
        let i = 1;
        try {
            while (true) {
                console.log('start while: ', i);
                const responseData = await SlackService.getListChannels(cursor);
                if (!responseData.ok) {
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

    static async collectMessages(req, res, next) {
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
                    await CollectorController.collectReplyMessages(channel.id, listThreadTs);
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

    static async collectReplyMessages(channelId, listThreadTs) {
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
}