import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    taskname: {
        type: String,
        required: [true, "Please enter a task name"]
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    }
}, {
    timestamps: true
});

export default mongoose.model("tasks", taskSchema);


