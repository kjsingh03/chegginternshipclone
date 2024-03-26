import Express from 'express';
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'
import userRouter from './routes/user.js';
import authRouter from './routes/auth.js';
import internshipRouter from './routes/internship.js';
import Razorpay from 'razorpay'
import path from 'path'
import { sendPromo } from './controllers/user.js';

const app = Express();

// Razorpay

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
});


// MongoDB Connection

(async () => {
    mongoose.connect(process.env.MONGO_URL)
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

app.listen(process.env.PORT, () => {
    console.log(`Server is working at http://localhost:${process.env.PORT}`);
})

