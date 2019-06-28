import { CollectorController } from '../controllers';

module.exports = (app, router) => {
    // router.route('/collect')
    //     .get(CollectorController.collectChannels);

    router.route('/channels')
        .post(CollectorController.collectChannels)
        .get(CollectorController.collectMessages);
};
