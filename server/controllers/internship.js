import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import { Internship, User } from '../models/userModel.js'
import { v4 as uuidv4 } from 'uuid';
const publicKey = fs.readFileSync(path.join(path.resolve(), './public.key'), "utf-8")


export const createInternship = async (req, res) => {
    try {
        const internship = new Internship(req.body)
        internship.save()
            .then(() => {
                const token = req.headers['authorization'];
                
                jwt.verify(token, publicKey, async function (err, decoded) {
                    if(!err){
                        let user = await User.findOne({ username: decoded.username })
                        user.internships=[...user.internships,internship._id]
                        internship.createdBy = user._id
                        internship.id = uuidv4();
                        user.save()
                        internship.save()
                            .then(() => res.status(201).json({ "Success": "true", "message": "Internship created successfully", "internship": internship }))
                            .catch((err) => { return res.status(404).json({ "Success": "false", "message": err.message }) })
                    }
                    else{
                        return res.status(404).json({ "Success": "false", "message": err.message })
                    }
                })
            })
            .catch((err) => { return res.status(404).json({ "Success": "false", "message": err.message.split(":").pop() }) })


    } catch (error) {
        return res.status(404).json({ "Success": "false", "message": error })
    }
}

export const getInternship = async (req, res) => {
    try {
        const id = req.params.id;
        let internship = await Internship.findOne({ id: id })
        if (internship) {
            // internship = await Internship.findOne({ id: id }).populate("studentsEnrolled").exec()
            return res.status(200).json({ "Success": true, "message": "Internship fetched successfully", internship })
        }
        else {
            res.status(404).json({ "success": false, "message": "Internship not found" })
        }
    } catch (err) {
        res.status(404).json({ "success": false, "message": "Failed to fetch internship" })
    }
}

export const getAllInternships = async (req, res) => {
    try {
        let internships = await Internship.find();
        if (internships) {
            internships=await Internship.find()
            res.status(201).json({ "success": true, internships })
        } else {
            res.status(404).json({ "success": false, "message": "Failed to fetch internships" })
        }
    } catch (err) {
        res.status(404).json({ "success": false, "message": "Failed to fetch users" })
    }
}

export const updateInternship = async (req, res) => {
    try {
        const id = req.params.id;
        let internship = await Internship.findOne({ id: id })
        if (internship) {
            if(req.body.certificates?.user==="" && req.body.studentsEnrolled ==="")
                internship = await Internship.findOneAndUpdate({ id: id }, {...req.body,studentsEnrolled:[...internship.studentsEnrolled],certificates:[...internship.certificates]}, { returnDocument: 'after' })
            else if(req.body.studentsEnrolled ==="")
                internship = await Internship.findOneAndUpdate({ id: id }, {...req.body,studentsEnrolled:[...internship.studentsEnrolled]}, { returnDocument: 'after' })
            else if(req.body.certificates?.user==="" )
                internship = await Internship.findOneAndUpdate({ id: id }, {...req.body,certificates:[...internship.certificates]}, { returnDocument: 'after' })
            else if(req.body.certificates && req.body.studentsEnrolled)
                internship = await Internship.findOneAndUpdate({ id: id }, {...req.body,studentsEnrolled:[...internship.studentsEnrolled,req.body.studentsEnrolled],certificates:[...internship.certificates,req.body.certificates]}, { returnDocument: 'after' })
            else if(req.body.certificates && !req.body.studentsEnrolled)
                internship = await Internship.findOneAndUpdate({ id: id }, {...req.body,certificates:[...internship.certificates,req.body.certificates]}, { returnDocument: 'after' })
            else if(!req.body.certificates && req.body.studentsEnrolled)
                internship = await Internship.findOneAndUpdate({ id: id }, {...req.body,studentsEnrolled:[...internship.studentsEnrolled,req.body.studentsEnrolled]}, { returnDocument: 'after' })
            else if(!req.body.certificates && !req.body.studentsEnrolled)
                internship = await Internship.findOneAndUpdate({ id: id }, req.body, { returnDocument: 'after' })
            internship.save()
                .then(() => { return res.status(200).json({ "Success": true,"message":"Internship updated successully", "internship": internship }) })
                .catch((err) => { return res.status(404).json({ "Success": "false", "message": "Failed to save internship", "error": err.message }) })
        }
        else {
            res.status(404).json({ "success": false, "message": "Internship not found" })
        }

    } catch (err) {
        res.status(404).json({ "success": false, "message": "Failed to update internship",err:err })
    }
}

export const removeInternship = async (req, res) => {
    try {
        const id = req.params.id;
        let internship = await Internship.findOne({ id: id })
        if (internship) {
            internship = await Internship.findOneAndDelete({ id: id }, req.body, { returnDocument: 'after' })
            res.status(200).json({ "Success": true, "message": internship })
        }
        else {
            res.status(404).json({ "success": false, "message": "Internship not found" })
        }
    } catch (err) {
        res.status(404).json({ "success": false, "message": "Failed to fetch internship" })
    }
}


