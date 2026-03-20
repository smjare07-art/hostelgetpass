const mongoose = require("mongoose")

const MessSchema = new mongoose.Schema({

name:String,

phone:String,

email:String,

password:String,

messName:String,

status:{
type:String,
default:"Active"
},

createdAt:{
type:Date,
default:Date.now
}

})

module.exports = mongoose.model("Mess",MessSchema)