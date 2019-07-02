import { CollectorController } from '../controllers';

module.exports = (app, router) => {
    router.route('/slack/webhook')
        .post(CollectorController.webhook);
};
