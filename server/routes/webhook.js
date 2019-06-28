module.exports = (app, router) => {
    router.route('/slack/verification')
        .post((req, res) => {
            return res.status(200).json({
                challenge: req.body.challenge
            });
        });

    router.route('/slack/webhook')
        .post((req, res) => {
            console.log(req.body);
            return res.status(200).end();
        });
};
