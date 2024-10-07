import Task from "../models/taskModel.js";
import User from "../models/userModel.js";

const fetchTasksToDo = async (req, res) => {
  const userId = req.user._id;
  const email = req.user.email;

  let user;
  try {
    user = await User.findById(userId).populate("tasksAssigned");
  } catch (error) {
    return res.status(500).json({
      message: "❌ Error fetching user.",
    });
  }
  return res.status(200).json({
    message: "✅ successful fetch.",
    data: user.tasksAssigned,
  });
};
const createNewTask = async (req, res) => {
  /*
    1. create a new task entry in the db
    2. use the taskId to push a new task in the current logged in user's tasksCreated array
    3. return 201
    */
  const { title, content, usersAssigned } = req.body;
  const ownerId = req.user._id;

  let task;
  console.log("new task body", req.body);
  try {
    task = await Task.create({
      title,
      content,
      usersAssigned,
    });
  } catch (error) {
    return res.status(500).json({
      message: "❌ Error creating task.",
      error,
    });
  }
  let user;
  try {
    user = await User.updateOne(
      { _id: ownerId },
      { $push: { tasksCreated: task._id } }
    );
    usersAssigned.forEach(async (new_user_id) => {
      await User.updateOne(
        { _id: new_user_id },
        { $push: { tasksAssigned: task._id } }
      );
    });
  } catch (error) {
    return res.status(500).json({
      message: "❌ Error fetching/updating user.",
      error,
    });
  }
  return res.status(201).json({
    message: "✅ Successfully created a new task.",
    data: task,
  });
};

const fetchTasksOwned = async (req, res) => {
  let tasks = [];
  let thisUser;
  try {
    thisUser = await User.findById(req.user._id).populate("tasksCreated");
    tasks = thisUser.tasksCreated;
    res.status(200).json({
      message: "✅ Successfully fetched the tasks.",
      data: tasks,
    });
  } catch (error) {
    return res.status(500).json({
      message: "❌ Error fetching tasks.",
      error,
    });
  }
};
const markTaskCompleted = async (req, res) => {
  const taskId = req.params.taskId;
  let task;
  try {
    task = await Task.updateOne(
      { _id: taskId },
      { $set: { isFinished: true } }
    );
    res.status(200).json({
      message: "✅ Successfully updated task completion status.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "❌ Error updating task.",
      error,
    });
  }
};
const deleteTask = async (req, res) => {
  /*
    To delete a task we need to:
    1. delete it from its owner's tasksCreated array
    2. delete it from each of the task's usersAssigned users's tasksAssigned object
    3. delete the task from the Task collection
    */
  let taskId = req.params.id;
  let task;
  let owner;
  try {
    owner = await User.update(
      { _id: req.user._id },
      { $pull: { tasksCreated: taskId } }
    );
    task = await Task.findById(taskId);
    task.usersAssigned.forEach(async (userId) => {
      await User.update({ _id: userId }, { $pull: { tasksAssigned: taskId } });
    });
    await Task.findByIdAndDelete(taskId); // or
    // await Task.deleteOne({_id: taskId});
    res.status(200).json({
      message: "✅ Successfully deleted the task.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "❌ Error while deleting task.",
      error,
    });
  }
};
const updateTask = async (req, res) => {
  /*
    2 types of updates we need to handle:
    1. title or content or isFinished
    2. usersAssigned:
        a) first delete the task from the old assigned users
        b) then update the new assigned users with the task
    */
  let taskId = req.params.id;
  let task;
  try {
    if (req.body.usersAssigned) {
      task = await Task.findById(taskId);
      task.usersAssigned.forEach(async (userId) => {
        await User.findByIdAndUpdate(userId, {
          $pull: { tasksAssigned: taskId },
        });
      });
      let newUsers = req.body.usersAssigned;
      newUsers.forEach(async(userId) => {
        await User.findByIdAndUpdate(userId, {$push: {tasksAssigned: taskId}});
      });
    }
    await Task.findByIdAndUpdate(taskId, req.body); // update the task instance regardless of case 1 or 2
    res.status(200).json({
        message: "✅ Successfully updated the task.",
      });
  } catch (error) {
    return res.status(500).json({
        message: "❌ Error while updating task.",
        error,
      });
  }
};

const tasksController = {
  fetchTasksToDo,
  fetchTasksOwned,
  markTaskCompleted,
  createNewTask,
  deleteTask,
  updateTask,
};
export default tasksController;
