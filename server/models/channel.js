import Mongoose from './init-mongoose';

const schema = new Mongoose.Schema({
    id: {
        type: String,
        required: true,
        maxlength: 128,
        unique: true
    },
    name: {
        type: String,
        required: true,
        maxlength: 512,
    },
    created: {
        type: Number,
        maxlength: 30
    },
    is_archived: {
        type: Boolean
    },
    is_general: {
        type: Boolean
    },
    creator: {
        type: String,
        maxlength: 128
    },
    topic: {
        value: {
            type: String,
            maxlength: 512
        },
        creator: {
            type: String,
            maxlength: 128
        },
        last_set: {
            type: Number,
            maxlength: 30
        }
    },
    purpose: {
        value: {
            type: String,
            maxlength: 512
        },
        creator: {
            type: String,
            maxlength: 128
        },
        last_set: {
            type: Number,
            maxlength: 30
        }
    },
    members: [{
        type: String,
        maxlength: 50
    }]
});

module.exports = Mongoose.model('Channel', schema);
