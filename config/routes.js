const auth = require("../controllers/authCtrl");
const carsController = require("../controllers/carsCtrl");
const themeController = require("../controllers/themeCtrl");


module.exports = (app) => {

    app.use('/register', auth.registerController);
    app.use('/login', auth.loginController);
    app.use('/logout', auth.logoutController);
    app.use('/profile', auth.profileController);
    app.use('/cars', carsController);
    app.use('/themes', themeController);
}