const taskServices = require('../services/taskServices');
const aiServices = require('../services/aiServices');


const createTask = async (req, res, next) => {
     const payload = req.body;
      payload.userId = req.user.id;
     console.log(payload);
     const response = await taskServices.createTask(payload);
     return res.status(response?.success? 200:400).json(response);
}

const getAllTasks = async (req, res, next) => {
    const userId = req.user.id;
    const response = await taskServices.getAllTasks(userId);

    return res.status(response?.success? 200:400).json(response);
}

const getTaskById = async (req, res, next) => {
    const userId = req.user.id;
    const taskId = req.params.id;
    const response = await taskServices.getTaskById(userId, taskId);
    return res.status(response?.success? 200:400).json(response);
}

const updateTask = async (req, res, next) => {

    const payload = req.body;
    const taskId = req.params.id;
    const userId = req.user.id;
    const response = await taskServices.updateTask(payload, taskId,userId);
    return res.status(response?.success? 200:400).json(response);
}

const deleteTask = async (req, res, next) => {
    const taskId = req.params.id;
    const userId = req.user.id;
    const response = await taskServices.deleteTask(taskId, userId);
    return res.status(response?.success? 200:400).json(response);
}

const summarizeTask = async (req, res, next) => {
    const description = req.body.description;
    const response = await aiServices.summarizeTask(description);
    return res.status(response?.success? 200:400).json(response);

}

module.exports = {
    createTask,
    getAllTasks,
    updateTask,
    deleteTask,
    summarizeTask,
    getTaskById,
}