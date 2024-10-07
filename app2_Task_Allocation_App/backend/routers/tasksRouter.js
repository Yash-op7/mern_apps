import express from "express";
import tasksController from '../controllers/tasksController.js';

export  const router = express.Router();

router.get('/test', (req, res) => {
    res.send('tested...');
})


router.get('/todo', tasksController.fetchTasksToDo);
router.get('/owned', tasksController.fetchTasksOwned);
router.patch('/:taskId/completed', tasksController.markTaskCompleted)

// createTask
router.post('/new', tasksController.createNewTask);

// deleteTask
router.delete('/:id', tasksController.deleteTask);

// updateTask created by them
router.put('/:taskid', tasksController.updateTask)