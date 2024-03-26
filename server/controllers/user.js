import { User } from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import path from 'path'
import fs from 'fs'
import nodemailer from 'nodemailer'
import 'dotenv/config'

const privateKey = fs.readFileSync(path.join(path.resolve(), './private.key'), "utf-8")

export const signup = async (req, res) => {
    try {
        let { username } = req.body
        username = username?.toLowerCase();
        let user = await User.findOne({ username: username })
        if (!user) {
            user = await User.findOne({ email: req.body.email })
            if (!user) {
                user = new User(req.body)
                user.save()
                    .then(() => {
                        bcrypt.genSalt(10, function (err, salt) {
                            bcrypt.hash(user.password, salt, function (err, hash) {
                                user.password = hash;
                                var token = jwt.sign({ username: user.username }, privateKey, { algorithm: 'RS256' });
                                user.token = token;
                                user.save()
                                res.status(201).json({ "Success": "true", "message": "User created successfully", user })
                            });
                        });
                    })
                    .catch((err) => res.status(404).json({ "Success": "false", "message": err.message.split(":").pop() }))
            }
            else {
                return res.status(404).json({ "Success": "false", "message": "User already Exist" })
            }
        }
        else {
            return res.status(404).json({ "Success": "false", "message": "User already Exist" })
        }
    } catch (error) {
        return res.status(404).json({ "Success": "false", "message": error.message })
    }
}

export const login = async (req, res) => {
    try {
        let { username, password } = req.body;
        if (username) {
            if (password) {
                let user = await User.findOne({ username: username })
                if (user) {
                    bcrypt.compare(password, user.password, function (err, result) {
                        if (result) {
                            var token = jwt.sign({ username: user.username }, privateKey, { algorithm: 'RS256' });
                            user.token = token;
                            user.save()
                                .then(async () => {
                                    // user=await User.findOne({ username: username }).populate('internships').exec()
                                    return res.status(201).json({ "Success": "true", "message": "User logged in successfully", user })
                                })
                                .catch((err) => { return res.status(201).json({ "Success": "false", "message": "Failed to login", "error": err.message }) })
                        }
                        else {
                            return res.status(404).json({ "Success": "false", "message": "Please enter valid Password" })
                        }
                    });
                }
                else {
                    return res.status(404).json({ "Success": "false", "message": "User Not found" })
                }
            } else {
                return res.status(404).json({ "Success": "false", "message": "Please enter password" })
            }

        } else {
            return res.status(404).json({ "Success": "false", "message": "Please enter Username" })
        }

    } catch (error) {
        return res.status(404).json({ "Success": "false", "message": error.message })
    }
}

export const googleLogin = async (req, res) => {
    try {
        const { email } = req.body;
        if (email) {
            let user = await User.findOne({ email: email })
            if (user) {
                var token = jwt.sign({ username: user.username }, privateKey, { algorithm: 'RS256' });
                user.token = token;
                user.save()
                    .then(async () => {
                        // user=await User.findOne({ username: username }).populate('internships').exec()
                        return res.status(201).json({ "Success": "true", "message": "User logged in successfully", user })
                    })
                    .catch((err) => { return res.status(201).json({ "Success": "false", "message": "Failed to login", "error": err.message }) })
            }
            else {
                return res.status(404).json({ "Success": "false", "message": "User Not found" })
            }
        } else {
            return res.status(404).json({ "Success": "false", "message": "Please enter Username" })
        }

    } catch (error) {
        return res.status(404).json({ "Success": "false", "message": error.message })
    }
}

export const logout = async (req, res) => {
    try {
        let user = await User.findOne({ username: req.body.username })
        if (user) {
            user.token = "";
            user.save()
                .then(() => { res.status(201).json({ "Success": "true", "message": "User logged out successfully" }) })
                .catch((err) => { res.status(201).json({ "Success": "false", "message": "Failed to log out", "error": err.message }) })
        }
        else {
            return res.status(404).json({ "Success": "false", "message": "User not found" })
        }
    } catch (error) {
        return res.status(404).json({ "Success": "false", "message": error.message })
    }
}

export const getAllUsers = async (req, res) => {
    try {
        let users = await User.find();
        if (users) {
            users = await User.find().populate("internships").exec()
            res.status(200).json(users);
        }
        else {
            res.status(404).json({ "success": false, "message": "Users not found" })
        }
    } catch (err) {
        res.status(404).json({ "success": false, "message": "Failed to fetch users" })
    }
}

export const getUser = async (req, res) => {
    try {
        const username = req.params.username;
        if (!username) {
            res.status(404).json({ "success": false, "message": "Enter username" })
        }
        else {
            let user = await User.findOne({ username: username }).populate("internships").exec();
            if (user) {
                res.status(200).json(user);
            }
            else {
                res.status(404).json({ "success": false, "message": "Users not found" })
            }
        }
    } catch (err) {
        res.status(404).json({ "success": false, "message": "Failed to fetch users" })
    }
}

export const updateUser = async (req, res) => {
    try {
        const username = req.body.username;
        if (username) {
            let user = await User.findOne({ username: username })
            if (user) {
                user = await User.findOneAndUpdate({ username: username }, {...req.body, internships: [...user.internships, req.body.internship], certificates: [...user.certificates, req.body.certificates]}, { returnDocument: 'after' });
                res.status(200).json({ "success": true, "message": "User updated successfully", user });
            } else {
                res.status(404).json({ "success": false, "message": "User not found" });
            }
        } else {
            res.status(404).json({ "success": false, "message": "Please enter username" })
        }
    } catch (err) {
        res.status(404).json({ "success": false, "message": "Failed to update User" })
    }
}

export const removeUser = async (req, res) => {
    try {
        const username = req.body.username;
        if (username) {
            let user = await User.findOne({ username: username })
            if (user) {
                user = await User.findOneAndDelete({ username: username }, req.body, { returnDocument: 'after' });
                res.status(200).json({ "success": true, "message": "User deleted successfully" });
            } else {
                res.status(404).json({ "success": false, "message": "User not found" });
            }
        } else {
            res.status(404).json({ "success": false, "message": "Please enter username" })
        }
    } catch (err) {
        res.status(404).json({ "success": false, "message": "Failed to delete User" })
    }
}

export const sendPromo = async (req, res) => {
    try {
        let user = await User.findOne({ role: "Admin" });
        if (user) {
            res.status(200).json({ promocodes: user.promocodes });
        }
        else {
            res.status(404).json({ "success": false, "message": "Users not found" })
        }
    } catch (err) {
        res.status(404).json({ "success": false, "message": "Failed to fetch users" })
    }
}

// export const forgetPassword = async (req, res) => {
//     try {
//         let { username } = req.body;
//         if (username) {
//             let user = await User.findOne({ username: username })
//             if (user) {
//                 const otp = parseInt(Math.floor(Math.random() * 900000 + 99999))
//                 res.json({ "success": true, otp: otp })

//                 let transporter = nodemailer.createTransport({
//                     service: 'Gmail',
//                     auth: {
//                         user: process.env.AUTH_EMAIL,
//                         pass: process.env.AUTH_PASSWORD,
//                     }
//                 });

//                 var mailOptions = {
//                     from: process.env.AUTH_EMAIL,
//                     to: user.email,
//                     subject: "Otp for registration is: ",
//                     html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>"
//                 };


//                 transporter.sendMail(mailOptions, (error, info) => {
//                     if (error) {
//                         return console.log(error);
//                     }
//                     console.log('Message sent: %s', info.messageId);
//                     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//                     res.render('otp', { msg: "otp has been sent" });
//                 });

//             }
//             else {
//                 res.status(404).json({ success: false, "message": "User not found" });
//             }
//         }
//         else {
//             res.status(404).json({ success: false, "message": "Please enter username" });
//         }
//     }
//     catch (err) {
//         res.status(404).json({ success: false, "message": err });
//     }
// }