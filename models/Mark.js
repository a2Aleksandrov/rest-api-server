const { Schema, model, Types } = require('mongoose');


const markSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    cars: [{
        type: Types.ObjectId,
        ref: 'Car'
    }]
});

const Mark = model('Mark', markSchema);

module.exports = Mark;