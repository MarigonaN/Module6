const express = require('express')
const studentSchema = require('./schema')

const studentsRouter = express.Router()

studentsRouter.get('/', async (req, res, next) => {
    try {
        const studentsList = await studentSchema.find(req.query)
        res.send(studentsList)
    } catch (error) {
        next(error)
    }
})




studentsRouter.get('/:id', async (req, res, next) => {
    try {
        const student = await studentSchema.findById(req.params.id)
        console.log(student)
        if (student) {
            res.send(student)
        } else {
            const error = new Error()
            error.httpStatusCode = 404
            next(error)
        }

    } catch (error) {
        next(error)
    }
})




studentsRouter.post('/', async (req, res, next) => {
    try {
        const newStudent = new studentSchema(req.body)
        const response = await newStudent.save()
        res.send(response)
    } catch (error) {
        next(error)
    }
})




studentsRouter.put('/:id', async (req, res, next) => {
    try {
        const response = await studentSchema.findByIdAndUpdate(req.params.id, req.body)
        console.log(response)
        res.send(response)
    } catch (error) {
        next(error)
    }
})




studentsRouter.delete('/:id', async (req, res, next) => {
    try {
        await studentSchema.findByIdAndDelete(req.params.id)

        res.send("deleted!")
    } catch (error) {
        next(error)
    }
})

module.exports = studentsRouter