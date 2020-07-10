const {Schema, model} = require('mongoose')
const v = require("validator")

const projectSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    description: String,
title: {
    type: String,
    required: true,
},
authors: [{
    type: Schema.Types.ObjectId, ref: "Author",
},
],


},
{ _id: false 
    },
)

const projectModel = model("Project", projectSchema)
module.exports = projectModel