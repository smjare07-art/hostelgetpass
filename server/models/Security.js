const mongoose = require("mongoose")

const SecuritySchema = new mongoose.Schema({

securityId:String,

name:String,

phone:String,

email:String,

password:String,

gate:String,

shift:String,

status:{
type:String,
default:"Active"
},

createdAt:{
type:Date,
default:Date.now
}

})

module.exports = mongoose.model("Security",SecuritySchema)