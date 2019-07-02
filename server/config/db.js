import dotEnv from 'dotenv';
dotEnv.config();

const db = {
    development: {
        URL: process.env.MONGODB_URI,
    },
    test: {
        URI: '',
        IS_DEBUG: true
    },
    staging: {},
    production: {
        URL: process.env.MONGODB_URI,
    }
};

module.exports = db;

