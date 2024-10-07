import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        select: false
    },
    tasksCreated: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task'
        }],
        default: []
    },
    tasksAssigned: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task'
        }],
        default: []
    }
});

const User = mongoose.model('User', userSchema);
export default User;