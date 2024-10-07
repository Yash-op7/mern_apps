import Task from "../models/taskModel.js";
import User from "../models/userModel.js";

const fetchTasksToDo = async (req, res) => {
    const userId = req.user._id;
    const email = req.user.email;

    let user;
    try {
        user = await User.findById(userId).populate('tasksAssigned');
    } catch (error) {
        return res.status(500).json({
            message: '❌ Error fetching user.'
        })
    }
    return res.status(200).json({
        message: '✅ successful fetch.',
        data: user.tasksAssigned
    });
};
const createNewTask = async (req, res) => {
    /*
    1. create a new task entry in the db
    2. use the taskId to push a new task in the current logged in user's tasksCreated array
    3. return 201
    */
    const {title, content, usersAssigned} = req.body;
    const ownerId = req.user._id;

    let task;
    console.log('new task body', req.body);
    try {
        task = await Task.create({
            title, content, usersAssigned
        });
    } catch (error) {
        return res.status(500).json({
            message: '❌ Error creating task.',
            error
        })
    }
    let user;
    try {
        user = await User.updateOne({_id: ownerId}, {$push: {tasksCreated: task._id}});
        usersAssigned.forEach(async(new_user_id) => {
            await User.updateOne({_id: new_user_id}, {$push: {tasksAssigned: task._id}});
        });
    } catch (error) {
        return res.status(500).json({
            message: '❌ Error fetching/updating user.',
            error
        });
    }
    return res.status(201).json({
        message: '✅ Successfully created a new task.',
        data: task
    })
};

const fetchTasksOwned = async (req, res) => {};
const markTaskCompleted = async (req, res) => {};
const deleteTask = async (req, res) => {};
const updateTask = async (req, res) => {};

const tasksController = { fetchTasksToDo, fetchTasksOwned, markTaskCompleted, createNewTask, deleteTask, updateTask };
export default tasksController;


