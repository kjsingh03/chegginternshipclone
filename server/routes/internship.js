import { Router } from 'express'
import { createInternship, getAllInternships, getInternship, removeInternship, updateInternship } from '../controllers/internship.js';

const internshipRouter = Router();

internshipRouter
    .post("/", createInternship)
    .get('/', getAllInternships)
    .get('/:id', getInternship)
    .put("/:id", updateInternship)
    .delete('/:id', removeInternship)

export default internshipRouter