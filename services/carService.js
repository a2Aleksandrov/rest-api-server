const Car = require('../models/Car');
const Mark = require('../models/Mark');

function getAllCars() {
    return Car.find({});
}

function getCarsByMark(mark) {
    return Car.find({mark});
}

function getCarByModel(model) {
    return Car.findOne({model});
}

function getCarDetails(carId) {
    return Car.findById(carId);
}

function getAllMarks() {
    return Mark.find({});
}

module.exports = {
    getAllCars,
    getCarsByMark,
    getCarByModel,
    getCarDetails,
    getAllMarks
}