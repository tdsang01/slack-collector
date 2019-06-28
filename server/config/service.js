import dotEnv from 'dotenv';
dotEnv.config();

module.exports = {
    SLACK: {
        URL: 'https://slack.com/api',
        TOKEN: process.env.SLACK_TOKEN
    }
};