const mongoose = require("mongoose")

const messRequestSchema = new mongoose.Schema({

studentId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Student"
},

studentName:String,

messId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Mess"
},

status:{
type:String,
default:"pending"
}

})

module.exports = mongoose.model("MessRequest",messRequestSchema)