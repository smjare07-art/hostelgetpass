const mongoose = require("mongoose")

const MessStudentSchema = new mongoose.Schema({

studentId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Student",
required:true
},

messId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Mess"
},

name:String,

room:Number,

joinDate:{
type:Date,
default:Date.now
},

dailyRate:{
type:Number,
default:100
},

status:{
type:String,
default:"Active"
}

})

module.exports = mongoose.model("MessStudent",MessStudentSchema)