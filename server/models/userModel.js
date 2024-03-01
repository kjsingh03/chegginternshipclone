import { Schema, model } from "mongoose";
import mongooseHidden from 'mongoose-hidden'


const internshipSchema = new Schema({
    position: { type: String, required: [true, "Enter Position"] },
    organisation: { type: String, required: [true, "Enter Organisation"] },
    location: { type: String, required: [true, "Enter Location"] },
    stipend: { type: Number, required: [true, "Enter Stipend"] },
    startTime: { type: Number, required: [true, "Enter Duration"] },
    lastApplyDate:{type:Date,required: [true, "Enter last date to apply"]},
    skills: [{type: String}],
    perks: [{ type: String }],
    createdBy:{ type: Schema.Types.ObjectId, ref: "User" },
    price:{type:Number,required:[true,"Enter price"]},
    id:{type:String},
    // vacancies: { type: Number, required: [true, "Enter vacancies"] },
    // about: { type: String, required: [true, "Enter About section"] },
    // description: { type: String, required: [true, "Enter Description"] },
    // joiningPeriod:{type:String,required: [true, "Enter starting period"]},
})

const userSchema = new Schema({
    role: { type: String, enum: ["User", "Organisation"], default: "User" },
    token: { type: String },
    internships: [{ type: Schema.Types.ObjectId, ref: "Internship" }],
    username: { type: String, required: [true, "Enter Username"], unique: [true, "User already exits"] },
    password: { type: String, required: [true, "Enter password"], minlength: [8, "Password must be atleast 8 characters long"] },
})

userSchema.plugin(mongooseHidden(), { hidden: { _id: true, password: true} })

export const Internship = model("Internship", internshipSchema);

export const User = model("User", userSchema);