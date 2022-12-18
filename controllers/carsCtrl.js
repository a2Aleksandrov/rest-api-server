const { getCarsByMark, getCarByModel, getAllMarks } = require('../services/carService');

const carsController = require('express').Router();

carsController.get('/', async (req, res) => {
    try {
        const cars = await getAllMarks();
        res.status(200).send(cars);

    } catch (error) {
        res.send(error);
    }
});

carsController.get('/:mark', async (req, res) => {
    try {
        const marks = await getCarsByMark(req.params.mark);
        res.status(200).send(marks);
    } catch (error) {
        res.send(error);
    }
});

carsController.get('/:mark/:model', async (req, res) => {
    try {
        const model = await getCarByModel(req.params.model);
        res.status(200).send(model);
    } catch (error) {
        res.send(error);
    }
});

module.exports = carsController;