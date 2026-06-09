const mongoose = require('mongoose');

const { Schema } = mongoose;

const employeeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: '보통',
    },
});

module.exports = mongoose.model('Employee', employeeSchema);