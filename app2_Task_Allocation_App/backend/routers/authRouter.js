import express from "express";
import authController from "../controllers/authController.js";
import { validateCredentials } from "../utils/validator.js";

const router = express.Router();

router.post('/signup', validateCredentials, authController.signup);
router.post('/signin', validateCredentials, authController.signin);
router.post('/signout', authController.signout);

export {router};