const taskModel = require("../models/Task");
const createTask = async (payload) => {
    try {
        const task = await taskModel.insertOne(payload);
        if (!task) {
            return {
                success: false,
                error: 'task creation failed',
            }
        }
        return {
            success: true,
            message: 'Task created successfully.',
        }

    }catch(err) {
        console.log("Error while creating task", err);
        return {
            success: false,
            message: err.message,
        }
    }
}

const getAllTasks = async (userId)=>{
    try{
        const allTasks = await taskModel.find({userId});
        if(!allTasks){
            return {
                success: false,
                error: 'tasks not found',
            }
        }
        return {
            success: true,
            message: 'All tasks retrieved successfully.',
            data: allTasks
        }
    }catch(err){
        console.log("Error while retrieving tasks", err);
        return {
            success: false,
            message: err.message,
        }
    }
}
const getTaskById = async (userId,taskId)=>{
    try{
        const task = await taskModel.findOne({_id:taskId,userId});
        if (!task) {
            return {
                success: false,
                message: 'task not found',
            }
        }
        return {
            success: true,
            message: 'Task found successfully.',
            data: task
        }
    }catch(err){
        console.log("Error while retrieving task", err);
        return {
            success: false,
            message: err.message,
        }
    }
}

const updateTask = async (payload, taskId,userId)=> {
    try {
        const task = await taskModel.findOneAndUpdate({_id: taskId,userId},payload,{ new: true });
        if (!task) {
            return {
                success: false,
                message: "Task not found",
            }
        }
        return {
            success: true,
            message: 'Task updated successfully.',
            data: task
        }
    }catch(err){
        console.log("Error while updating task", err);
        return {
            success: false,
            message: err.message,
        }
    }
}

const deleteTask = async (taskId,userId) => {
    try{
        const task = await taskModel.findOneAndDelete({_id:taskId,userId});
        if (!task) {
            return {
                success: false,
                message: "Task not found",
            }
        }
        return {
            success: true,
            message: 'Task deleted successfully.',
        }
    }catch(err){
        console.log("Error while deleting task", err);
        return {
            success: false,
            message: err.message,
        }
    }

}


module.exports = {
    createTask,
    getAllTasks,
    updateTask,
    deleteTask,
    getTaskById
}