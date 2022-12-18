const express = require('express');
const cookieParser = require('cookie-parser');
const config = require('../config/config');
const cors = require('cors');
const session = require('../middlewares/session');
//const trimBody = require('../middlewares/trimBody');

module.exports = (app) => {

    app.use(cors({ origin: config.origin, credentials: true }));
    app.use(express.json());
    app.use('/static', express.static('static'));
    app.use(cookieParser());
    app.use(session());
   // app.use(trimBody('password'));
}