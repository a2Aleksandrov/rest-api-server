const mongoose = require('mongoose');
//const data = require('../connData');
const config = require('./config');

// const CONNECTION_STRING = data.databaseConnection;

module.exports = async (app) => {
    try {
        mongoose.connect(config.dbURL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        
        console.log('Database connected!');

    } catch (error) {
        console.error(err.message);
        process.exit(1);
    }
}