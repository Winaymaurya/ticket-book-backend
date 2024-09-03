import express from "express";
import { loginController, registerController } from "../controller/authController.js";

const router=express.Router()

// Register User
router.post('/register',registerController)

// Login user
router.post('/login',loginController)

export default router