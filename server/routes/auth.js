import { Router } from 'express'
import {  forgetPassword, googleLogin, login, logout, signup } from '../controllers/user.js';

const authRouter = Router();

authRouter
    .post("/signup", signup)
    .post('/login', login)
    .post('/google/login', googleLogin)
    .post('/logout', logout)
    .post('/forgetpassword',forgetPassword)

export default authRouter