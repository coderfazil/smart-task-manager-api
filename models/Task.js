const mongoose = require('mongoose');
const aiSummarySchema = new mongoose.Schema({
    summary: {
        type: String,
    },
    steps: [
        {
            type: String,
        }
    ],
    estimatedEffort: {
        type: String,
        enum: ["low", "medium", "high"]
    }
}, { _id: false });
const taskSchema = new mongoose.Schema({

title: {
    type: String,
    required: true,
},
    description: {
    type: String,
},
    status: {
    type: String,
    enum: ['todo', 'in-progress', 'completed'],
        default: 'todo'
},
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium"
    },
    dueDate: Date,
    aiSummary: aiSummarySchema,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {timestamps: true });

module.exports =  taskModel = mongoose.model('Task', taskSchema);