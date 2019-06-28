import BaseService from './base';
import { slackConfig } from '../config';

export default class SlackService extends BaseService {
    static async getListChannels(cursor) {
        const url = `${slackConfig.URL}/channels.list`;
        const params = {
            token: slackConfig.TOKEN,
            limit: 1
        };
        if (cursor) {
            params.cursor = cursor;
        }
        const dataRequest = {
            method: 'GET',
            url,
            params
        };
        return await SlackService.request(dataRequest);
    }

    static async getListMessages(channelId, cursor) {
        const url = `${slackConfig.URL}/conversations.history`;
        const params = {
            token: slackConfig.TOKEN,
            count: 10,
            channel: channelId
        };
        if (cursor) {
            params.cursor = cursor;
        }
        const dataRequest = {
            method: 'GET',
            url,
            params
        };
        return await SlackService.request(dataRequest);
    }

    static async getListRepliesMessage(channelId, theadTs, cursor) {
        const url = `${slackConfig.URL}/conversations.replies`;
        const params = {
            token: slackConfig.TOKEN,
            channel: channelId,
            limit: 10,
            ts: theadTs
        };
        if (cursor) {
            params.cursor = cursor;
        }
        const dataRequest = {
            method: 'GET',
            url,
            params
        };
        return await SlackService.request(dataRequest);
    }
}