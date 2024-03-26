import Express from 'express';
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'
import userRouter from './routes/user.js';
import authRouter from './routes/auth.js';
import internshipRouter from './routes/internship.js';
import Razorpay from 'razorpay'
import path from 'path'
import fs from 'fs'
import { v2 as cloudinary } from 'cloudinary'
import { sendPromo } from './controllers/user.js';

const PORT = process.env.PORT || 6000
const MONGO_URL = process.env.MONGO_URL;

const app = Express();

// Razorpay

export const instance = new Razorpay({
    key_id: "rzp_test_aFHU3em4ZdNLo4",
    key_secret: "DlfamjLMFddIKU78LVXSahZy",
});


// MongoDB Connection

(async () => {
    mongoose.connect(MONGO_URL)
        .then(() => console.log("Database connected successfully"))
        .catch((err) => console.log(err))
})();

// Middlewares

app.use(cors())
    .use(Express.json())
    .use(Express.static(path.join(path.resolve(), '/dist')))
    .use("/api/auth", authRouter)
    .use("/api/user", userRouter)
    .use("/api/internship", internshipRouter)
    .post("/api/pay", (req, res) => {
        instance.orders.create(req.body, function (err, order) {
            if (!err) {
                res.send(order)
            }
            else {
                res.send(err)
            }
        });
    })
    .get("/api/promocodes", sendPromo);


// Server Listening

app.listen(PORT, () => {
    console.log(`Server is working at http://localhost:${PORT}`);
})

