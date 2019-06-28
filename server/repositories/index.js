import BaseRepo from './base';
import { Channel, Message } from '../models';


module.exports = {
    messageRepo: new BaseRepo(Message),
    channelRepo: new BaseRepo(Channel)
};
