import axios from 'axios';

export default class ApiHelper {
    static async request(data) {
        const responseData = await axios(data);
        return responseData && responseData.data ? responseData.data : responseData;
    }
};
