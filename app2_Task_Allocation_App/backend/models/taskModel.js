import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required.']
    },
    content: {
        type: String,
    },
    isFinished: {
        type: Boolean,
        default: false
    },
    usersAssigned: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        required: true
    }
}, {
    timestamps: true
});

const Task = mongoose.model('Task', taskSchema);
export default Task;