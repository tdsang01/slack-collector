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
    is_channel: {
        type: Boolean
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
    unlinked: {
        type: Number,
        maxlength: 10
    },
    creator: {
        type: String,
        maxlength: 128
    },
    name_normalized: {
        type: String,
        maxlength: 128
    },
    is_shared: {
        type: Boolean
    },
    is_org_shared: {
        type: Boolean
    },
    is_member: {
        type: Boolean
    },
    is_private: {
        type: Boolean
    },
    is_mpim: {
        type: Boolean
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
    previous_names: {
        type: Array
    },
    num_members: {
        type: Number,
        maxlength: 10
    }
});

module.exports = Mongoose.model('Channel', schema);
