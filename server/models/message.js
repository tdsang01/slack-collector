import Mongoose from './init-mongoose';

const schema = new Mongoose.Schema({
    type: {
        type: String,
        maxlength: 50
    },
    text: {
        type: String,
        maxlength: 5000
    },
    files: [{
        id: {
            type: String,
            maxlength: 255
        },
        created: {
            type: Number,
            maxlength: 30
        },
        timestamp: {
            type: Number,
            maxlength: 30
        },
        name: {
            type: String,
            maxlength: 256
        },
        title: {
            type: String,
            maxlength: 256
        },
        mimetype: {
            type: String,
            maxlength: 255
        },
        filetype: {
            type: String,
            maxlength: 255
        },
        pretty_type: {
            type: String,
            maxlength: 255
        },
        user: {
            type: String,
            maxlength: 50
        },
        editable: {
            type: Boolean
        },
        size: {
            type: Number,
            maxlength: 30
        },
        mode: {
            type: String,
            maxlength: 255
        },
        is_external: {
            type: Boolean
        },
        external_type: {
            type: String,
            maxlength: 255
        },
        is_public: {
            type: Boolean
        },
        public_url_shared: {
            type: Boolean
        },
        display_as_bot: {
            type: Boolean
        },
        username: {
            type: String,
            maxlength: 255
        },
        url_private: {
            type: String,
            maxlength: 255
        },
        url_private_download: {
            type: String,
            maxlength: 255
        },
        thumb_64: {
            type: String,
            maxlength: 255
        },
        thumb_80: {
            type: String,
            maxlength: 255
        },
        thumb_360: {
            type: String,
            maxlength: 255
        },
        thumb_360_w: {
            type: Number,
            maxlength: 10
        },
        thumb_360_h: {
            type: Number,
            maxlength: 10
        },
        thumb_480: {
            type: String,
            maxlength: 255
        },
        thumb_480_w: {
            type: Number,
            maxlength: 10
        },
        thumb_480_h: {
            type: Number,
            maxlength: 10
        },
        thumb_160: {
            type: String,
            maxlength: 255
        },
        thumb_720: {
            type: String,
            maxlength: 255
        },
        thumb_720_w: {
            type: Number,
            maxlength: 10
        },
        thumb_720_h: {
            type: Number,
            maxlength: 10
        },
        thumb_800: {
            type: String,
            maxlength: 255
        },
        thumb_800_w: {
            type: Number,
            maxlength: 10
        },
        thumb_800_h: {
            type: Number,
            maxlength: 10
        },
        image_exif_rotation: {
            type: Number,
            maxlength: 10
        },
        original_w: {
            type: Number,
            maxlength: 10
        },
        original_h: {
            type: Number,
            maxlength: 10
        },
        permalink: {
            type: String,
            maxlength: 255
        },
        permalink_public: {
            type: String,
            maxlength: 255
        },
        is_starred: {
            type: Boolean
        },
        has_rich_preview: {
            type: Boolean
        }
    }],
    upload: {
        type: Boolean
    },
    user: {
        type: String,
        maxlength: 100
    },
    display_as_bot: {
        type: Boolean
    },
    ts: {
        type: String,
        maxlength: 50
    },
    client_msg_id: {
        type: String,
        maxlength: 50
    },
    thread_ts: {
        type: String,
        maxlength: 128
    },
    reply_count: {
        type: Number,
        maxlength: 128
    },
    reply_users_count: {
        type: Number,
        maxlength: 128
    },
    latest_reply: {
        type: String,
        maxlength: 50
    },
    subscribed: {
        type: Boolean
    },
    last_read: {
        type: String,
        maxlength: 50
    },
    replies: [{
        user: {
            type: String,
            maxlength: 50
        },
        ts: {
            type: String,
            maxlength: 50
        }
    }],
    reply_users: [{
        type: String,
        maxlength: 50
    }]
});

module.exports = Mongoose.model('Message', schema);
