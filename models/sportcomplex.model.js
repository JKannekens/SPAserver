const mongoose = require('mongoose');
const HallSchema = require('./hall.model')
const Schema = mongoose.Schema;

const SportComplexSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    houseNumber: {
        type: Number,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: false
    },
    halls: [HallSchema]
});

const SportComplex = mongoose.model('sportcomplex', SportComplexSchema);

module.exports = SportComplex;