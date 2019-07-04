import { QuestionController } from '../controllers';

module.exports = (app, router) => {
    router.route('/tags')
        .get(QuestionController.getListTags);

    router.route('/questions')
        .get(QuestionController.getListQuestions);

    router.route('/questions/:id')
        .get(QuestionController.getQuestionAndAnswers);

    router.route('/questions/tagged/:tag')
        .get(QuestionController.getListQuestionsByTag);
};