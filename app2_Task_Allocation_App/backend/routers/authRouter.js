import express from "express";
import authController from "../controllers/authController.js";
import { validateCredentials } from "../middleware/validator.js";
import rateLimit from "../middleware/rateLimit.js";

const router = express.Router();

router.post('/signup', rateLimit, validateCredentials, authController.signup);
router.post('/signin', rateLimit, validateCredentials, authController.signin);
router.post('/signout', authController.signout);

export {router};