import Express from 'express';
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'
import userRouter from '../backend/routes/user.js';
import authRouter from '../backend/routes/auth.js';
import internshipRouter from '../backend/routes/internship.js';
import Razorpay from 'razorpay'

const PORT = process.env.PORT || 6000
const MONGO_URL = process.env.MONGO_URL;

const app = Express();

// Razorpay

export const instance = new Razorpay({
    key_id: 'rzp_test_dI2cMfs9QmKiFd',
    key_secret: 'XRJ8OJ4cl5D2YVoarA9gTW4X',
});

// MongoDB Connection

(async () => {
    mongoose.connect(MONGO_URL)
        .then(() => console.log("Database connected successfully"))
        .catch((err) => console.log(err))
})()

// Middlewares

app.use(cors())
    .use(Express.json())
    .use(Express.static('dist'))
    .use("/auth",authRouter)
    .use("/user",userRouter)
    .use("/internship",internshipRouter)
    .post("/pay",(req,res)=>{
        instance.orders.create(req.body, function(err, order) {
            if(!err){
                res.send(order)
            }
            else{
                res.send(err)
            }
          });
        
    })

// Server Listening

app.listen(PORT, () => {
    console.log(`Server is working at http://localhost:${PORT}`);
})

