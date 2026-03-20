const mongoose = require("mongoose")

const GatePassSchema = new mongoose.Schema({

studentId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Student"
},

reason:String,
outDate:String,
outTime:String,
returnTime:String,
location:String,

status:{
type:String,
default:"Pending"
},

qrCode:String,

scanCount:{
type:Number,
default:0
},

used:{
type:Boolean,
default:false
}

})

module.exports = mongoose.model("GatePass",GatePassSchema)