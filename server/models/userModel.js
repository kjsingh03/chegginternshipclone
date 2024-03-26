import { Schema, model } from "mongoose";

// const certificateSchema = new Schema({
//     user:{type:Schema.Types.ObjectId,ref:"User"},
//     codeId:{type:String},
// })


const internshipSchema = new Schema({
    name: { type: String, required: [true, "Enter Course Name"] },
    branch: { type: String, required: [true, "Enter Branch Name"], enum: ["Computer", "Civil", "Electronics", "Mechanical", "Mining"] },
    duration: { type: Number, required: [true, "Enter Duration"] },
    discount: { type: Number, required: [true, "Enter discount"] },
    skills: [{ type: String }],
    perks: [{ type: String }],
    price: { type: Number, required: [true, "Enter price"] },
    id: { type: String },
    studentsEnrolled: [{ type: String }],
    certificates: [{
        user: { type: String },
        codeId: { type: String },
        courseName: { type: String },
    }],
    questions: [
        {
            question: { type: String, required: [true, "enter question"] },
            options: [
                {
                    option: { type: String, required: [true, "Enter option"] },
                    correct: { type: Boolean, required: [true, "Enter correct option"], default: false }
                }
            ]
        }],
    lessons: [
        {
            lesson: { type: String, required: [true, "Enter Lesson Name"] },
            url: { type: String },
            description: { type: String }
        }],
    assignmentTask: { type: String },
    assignmentUrl: { type: String },
    imageUrl: { type: String }

    // createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    // lastApplyDate: { type: Date, required: [true, "Enter last date to apply"] },
    // vacancies: { type: Number, required: [true, "Enter vacancies"] },
    // about: { type: String, required: [true, "Enter About section"] },
    // description: { type: String, required: [true, "Enter Description"] },
    // joiningPeriod:{type:String,required: [true, "Enter starting period"]},
})

const userSchema = new Schema({
    name: { type: String, required: [true, "Enter name"] },
    username: { type: String, required: [true, "Enter Username"], unique: [true, "User already exits"] },
    email: { type: String, required: [true, "Enter Email"], unique: [true, "Email already exists"], validate: [(email) => { return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email) }, "Please enter a valid email"] },
    contact: { type: Number, required: [true, "Enter contact number"] },
    college: { type: String, required: [true, "Enter college"] },
    password: { type: String, required: [true, "Enter password"], minlength: [8, "Password must be atleast 8 characters long"] },
    certificates: [{
        internship: { type: Schema.Types.ObjectId, ref: "Internship" },
        codeId: { type: String },
        date: { type: Date },
        percentage: { type: Number },
        name: { type: String },
        duration: { type: Number }
    }],
    role: { type: String, enum: ["User", "Admin"], default: "User" },
    token: { type: String },
    internships: [{ type: Schema.Types.ObjectId, ref: "Internship" }],
    promocodes: [{
        name: {
            type: String
        }, value: {
            type: Number
        }
    }],
    imageUrl: { type: String },
    thumbnails: [{ type: String }]
})

export const Internship = model("Internship", internshipSchema);

export const User = model("User", userSchema);

// const otpSchema = new Schema({
//     username: { type: String },
//     otp: Number,
//     createdAt: Date,
//     expiresAt: Date
// })

// userSchema.plugin(mongooseHidden(), { hidden: { password: true} })

// export const Certificate = model("Certificate",certificateSchema)

// export const OTP = model('OTP', otpSchema);
