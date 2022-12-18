const express = require('express');
const expressConfig = require('./config/express');
const databaseConfig = require('./config/database');
const routesConfig = require('./config/routes');
const config = require('./config/config');


startApp();

async function startApp() {

    const app = express();
    await databaseConfig(app);
    expressConfig(app);
    routesConfig(app);

    app.listen(config.port, () => console.log(`Server listening on port ${config.port}`));
}

