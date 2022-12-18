const validator = require('validator');
const { register, login, getProfile } = require('../services/authService');
const { parseError } = require('../util/parser');

const registerController = require('express').Router();
const loginController = require('express').Router();
const logoutController = require('express').Router();
const profileController = require('express').Router();

removePassword = (data) => {
    const { password, repass, __v, ...userData } = data;
    return userData;
}

registerController.post('/', async (req, res) => {
    try {
        if (req.body.username == '' || req.body.email == '' || req.body.password == '') {
            throw new Error('All fields are required.');
        }
        if (validator.isEmail(req.body.email) == false) {
            throw new Error('Invalid Email.');
        }
        if (req.body.password.length < 4) {
            throw new Error('Password must be atleast 4 characters long.')
        }
        if (req.body.password != req.body.repass) {
            throw new Error('Passwords are not the same.');
        }
        const token = await register(req.body.username, req.body.email, req.body.password);

        res.cookie('token', token, { httpOnly: true, secure: true });
        const user = removePassword(req.body);
        res.status(200).send(user);

    } catch (error) {
        const errors = parseError(error);
        res.status(409).send(errors);
    }

});

loginController.post('/', async (req, res) => {
    try {
        const token = await login(req.body.username, req.body.password);
        res.cookie('token', token, { httpOnly: true, secure: true });
        const user = removePassword(req.body);
        res.status(200).send(user);
    } catch (error) {
        const errors = parseError(error);
        res.status(401).send(errors);
    }
});

logoutController.post('/', (req, res) => {
    res.clearCookie('token');
    res.status(204).send({ message: 'Logget out.' });
});

profileController.get('/', async (req, res) => {
    try {
        const user = await getProfile(req.user._id);
        res.status(200).send(user);
    } catch (error) {
        res.status(404).json({error: 'no data'});
    }
});


module.exports = {
    registerController,
    loginController,
    logoutController,
    profileController
};