const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const data = require('../connData');

const JWT_SECRET = data.session;


async function register(username, email, password) {
    const existingEmail = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
    if (existingEmail) {
        throw new Error('Email is taken.');
    }
    const existingUsername = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
    if (existingUsername) {
        throw new Error('Username is taken.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        hashedPassword
    });

    return createSession(user);
}

async function login(username, password) {
    const user = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
    if (!user) {
        throw new Error('Invalid username or password.');
    }
    const hasMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!hasMatch) {
        throw new Error('Invalid username or password.');
    }
    return createSession(user);
}

function createSession({ _id, username, email }) {
    const payload = {
        _id,
        username,
        email
    }
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
}

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}

function getProfile(userId) {
    return User.findById(userId);
}

module.exports = {
    register,
    login,
    verifyToken,
    getProfile
}