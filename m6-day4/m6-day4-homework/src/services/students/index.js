const express = require("express")
const fs = require("fs-extra")
const path = require ("path")
const uniqid = require("uniqid")
const studentSchema = require("./schema")

const studentsRouter = express.Router()


const readFile = (fileName) => {
    const buffer = fs.readFileSync(path.join(__dirname, fileName))
    const fileContent = buffer.toString()
    return JSON.parse(fileContent)
  }




studentsRouter.get("/", async(req, res) => {
   const students = await studentSchema.find(req.query)
   res.send(students)
})


studentsRouter.get("/:id", async(req, res) => {
    const id = req.params.id
    const student = await studentSchema.FindById(id)

    res.send(student)
})


studentsRouter.post("/", async(req, res) => {
     const newUser = new studentSchema(req.body)
     const response = await newUser.save()  
     res.send(response)
  

})


studentsRouter.put("/:id", async(req, res) => {
  const student = await studentSchema.Update(req.params.id, req.body)
  res.send(student)
 })


studentsRouter.delete("/:id", async(req,res) => {
  const student = await studentSchema.Delete(req.params.id)
  res.send("Deleted!" )
  
})

module.exports = studentsRouter