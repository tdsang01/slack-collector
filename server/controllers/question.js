import { success } from '../helpers/response';
import { messageRepo, channelRepo } from '../repositories';

export default class QuestionController {
    
    static async getListTags(req, res, next) {
        try {
            const results = await channelRepo._getAll({
                select: 'id name'
            });
            return success(res, results);
        } catch(e) {
            return next(e);
        }
    }
    
    static async getListQuestions(req, res, next) {
        try {
            const { page } = req.query;
            const results = await messageRepo._getAll({
                where: {
                    thread_ts: { $exists: false }
                },
                sort: {
                    ts: -1
                },
                page
            });
            return success(res, results);
        } catch(e) {
            return next(e);
        }
    }

    static async getQuestionAndAnswers(req, res, next) {
        try {
            const { page } = req.query;
            const question = await messageRepo._getOne({
                where: { _id: req.params.id }
            });
            const answers = await messageRepo._getAll({
                where: {
                    thread_ts: question.thread_ts,
                    _id: { $ne: question._id }
                },
                page
            });
            return success(res, {
                question, answers
            });
        } catch(e) {
            return next(e);
        }
    }
    
    static async getListQuestionsByTag(req, res, next) {
        try {
            const channel = await channelRepo._getOne({
                where: {
                    name: req.params.tag
                },
                select: '_id'
            });
            if (!channel) {
                return next(new Error('NOT_FOUND_TAG'));
            }
            const results = await messageRepo._getAll({
                where: {
                    thread_ts: { $exists: false },
                    channel: channel._id
                },
                sort: {
                    ts: -1
                },
                page
            });
            return success(res, results);
        } catch(e) {
            return next(e);
        }
    }
}