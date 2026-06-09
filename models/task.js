const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema({
    employeeId: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },
    workload: {
        type: Number,
        required: true,
    },
});

module.exports= mongoose.model('Task', taskSchema);