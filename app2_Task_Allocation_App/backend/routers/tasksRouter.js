import express from "express";
import tasksController from '../controllers/tasksController.js';

export  const router = express.Router();

router.get('/test', (req, res) => {
    res.send('tested...');
})

/* ROUTES RELATED TO TASKS */

// get all tasks, 2 routes
//  - assigned by them
//  - assigned to them
router.get('/todo', tasksController.fetchTasksToDo);
router.get('/owned', tasksController.fetchTasksOwned);

// mark task as completed, post request by taskId, can only be made to the tasks assigned to the current user
router.patch('/:taskId/completed', tasksController.markTaskCompleted)

// createTask
router.post('/new', tasksController.createNewTask);

// deleteTask
router.delete('/:id', tasksController.deleteTask);

// updateTask created by them
router.put('/:taskid', tasksController.updateTask)