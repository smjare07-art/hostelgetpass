const mongoose = require("mongoose")

const EntryLogSchema = new mongoose.Schema({

studentId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Student"
},

type:String,   // Entry / Exit

date:String,
time:String

})

module.exports = mongoose.model("EntryLog",EntryLogSchema)