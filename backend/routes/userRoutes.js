import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import { registerValidator, loginValidator } from '../validators/userValidator.js';
const router = express.Router();

router.post('/register', registerValidator, registerUser);
router.post('/login', loginValidator, loginUser);

export default router;
