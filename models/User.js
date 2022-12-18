const { Schema, model } = require('mongoose');


const userSchema = new Schema({
    username: {
        type: String,
        minlength: [2, 'Името трябва да е минимум 2 символа.']
    },
    email: {
        type: String,
        required: [true, 'Моля въведете валиден имейл.']
    },
    hashedPassword: {
        type: String,
        required: true
    }
});

userSchema.index({ username: 1 }, {
    collation: {
        locale: 'en',
        strength: 2 //case insensitive
    }
});
userSchema.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 2 //case insensitive
    }
});

const User = model('User', userSchema);

module.exports = User;