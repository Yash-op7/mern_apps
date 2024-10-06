import mongoose from "mongoose";

const taskEntrySchema = new mongoose.Schema({
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    isOwner: {
        type: Boolean,
        default: false
    }
});


const mapperSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'UserId is required to map to their list of tasks.']
    },
    tasks: {
        type: [taskEntrySchema],
        default: [] 
    }
})

export default mongoose.model('Mapper' ,mapperSchema);