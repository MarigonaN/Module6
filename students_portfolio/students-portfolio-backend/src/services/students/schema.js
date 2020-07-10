const {Schema, model} = require('mongoose')
const v = require("validator")

const studentSchema = new Schema({
name: {
    type: String,
    required: true,
},
surname: {
    type: String,
    required: true,
},
email: {
    type: String,
    required: true,
    lowercase: true,
    validate: async (value) => {
        if(!v.isEmail(value)){
            throw new Error("Email is not valid!")
        }else{
            const checkEmail = await studentModel.findOne({email: value})
            if (checkEmail){
                throw new Error("Email already in use!")
            }
        }

    }
},
dateOfBirth: Date,
Country: String,
})

const studentModel = model("Student", studentSchema)
module.exports = studentModel