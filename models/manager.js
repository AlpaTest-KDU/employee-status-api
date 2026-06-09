const mongoose = require('mongoose');

const { Schema } = mongoose;

const managerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    employees: [{
        type: Schema.Types.ObjectId,
        ref: 'Employee',
    }],
});

module.exports = mongoose.model('Manager', managerSchema);