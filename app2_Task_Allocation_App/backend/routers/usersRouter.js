import express from "express";
import userController from '../controllers/usersController.js';

export  const router = express.Router();

router.get('/test', (req, res) => {
    res.send('tested...');
})


router.get('/', userController.getAllUsers);