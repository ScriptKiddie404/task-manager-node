const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;