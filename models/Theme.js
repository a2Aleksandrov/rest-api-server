const { Schema, model, Types } = require('mongoose');


const themeSchema = new Schema({
    title: {
        type: String,
        minlength: [5, 'Title must be at least 5 characters long.']
    },
    content: {
        type: String,
        minlength: [10, 'Content must be at least 10 charachters long.']
    },
    author: {
        type: Types.ObjectId,
        ref: 'User'
    },
    posts: [{
        type: Types.ObjectId,
        ref: 'Post'
    }]
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

const Theme = model('Theme', themeSchema);

module.exports = Theme;