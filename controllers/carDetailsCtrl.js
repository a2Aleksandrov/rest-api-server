const { getCarDetails } = require('../services/carService');

const carDetailsController = require('express').Router();

carDetailsController.get('/:id', async (req, res) => {
    try {
        const details = await getCarDetails(req.params.id);
        res.status(200).send(details);
    } catch (error) {
        res.send(error);
    }
});

module.exports = carDetailsController;