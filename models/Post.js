const { Schema, model, Types } = require('mongoose');


const postSchema = new Schema({
    comment: {
        type: String,
        reduired: true
    },
    author: {
        type: Types.ObjectId,
        ref: 'User'
    },
    theme: {
        type: Types.ObjectId,
        ref: 'Theme'
    }
}, { timestamps: { createdAt: 'createdAt' } });

const Post = model('Post', postSchema);

module.exports = Post;