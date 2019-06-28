import { Request } from '../helpers';

export default class BaseService {
    static async request (params) {
        return await Request.request(params);
    }

}