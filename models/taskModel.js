import mongoose, { Types } from "mongoose";

const taskSchema = mongoose.Schema({
    taskname: {
        type: String,
        required: [true, "Please enter a task name"]
    },
     
}, {
    timestamps: true
});

export default mongoose.model("tasks", taskSchema);


