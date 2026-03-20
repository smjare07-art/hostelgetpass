const mongoose = require("mongoose")

const StudentSchema = new mongoose.Schema({

fullName:String,
fatherName:String,
mobile:String,
altMobile:String,
email:String,
dob:String,
gender:String,

photo:String,

collegeName:String,
branch:String,
year:String,
rollNumber:String,

hostelId:String,
roomNumber:String,
bedNumber:String,
joiningDate:String,
feeStatus:String,

address:String,
city:String,
state:String,
pincode:String,

parentName:String,
parentMobile:String,
parentAddress:String,
emergencyContact:String,

allowedOutTime:String,
curfewTime:String,

username:String,
password:String,

role:{
type:String,
default:"student"
},

status:{
type:String,
default:"Inside"
},
hostelFeeTotal:{
type:Number,
default:25000
},

feePaid:{
type:Number,
default:0
},
hostelType:{
type:String,
enum:["Boys","Girls"]
},

feeStatus:{
type:String,
default:"Pending"
}
})

module.exports = mongoose.model("Student",StudentSchema)