const { Schema, model } = require('mongoose');


const carSchema = new Schema({
    mark: {
        type: String,
        minlength: [2, 'Mark must be at least 2 characters long.']
    },
    model: {
        type: String,
        minlength: [2, 'Model must be at least 2 charachters long.']
    },
    img: [{
        type: String
    }],
    details: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    mileage: {
        type: Object,
        city: {
            type: Number
        },
        highway: {
            type: Number
        }
    },
    acceleration: {
        type: Number
    },
    topSpeed: {
        type: Number
    },
    battery: {
        type: Object,
        kind: {
            type: String
        },
        capacity: {
            type: String
        }
    }
});

carSchema.index({ model: 1 }, {
    collation: {
        locale: 'en',
        strength: 2 //case insensitive
    }
});

const Car = model('Car', carSchema);

module.exports = Car;