const Student = require("../models/Student")
const MessStudent = require("../models/MessStudent")
// CREATE STUDENT
exports.createStudent = async (req,res)=>{

try{

const student = new Student({
...req.body,
photo:req.file ? req.file.filename : ""
})

await student.save()

res.json(student)

}catch(err){

res.status(500).json(err)

}

}


// GET ALL STUDENTS
exports.getStudents = async (req,res)=>{

try{

const students = await Student.find()

res.json(students)

}catch(err){

res.status(500).json(err)

}

}


// DELETE STUDENT
exports.deleteStudent = async (req,res)=>{

try{

await Student.findByIdAndDelete(req.params.id)

res.json({message:"Student Deleted"})

}catch(err){

res.status(500).json(err)

}

}


// UPDATE STUDENT
exports.updateStudent = async (req,res)=>{

try{

await Student.findByIdAndUpdate(req.params.id,req.body)

res.json({message:"Student Updated"})

}catch(err){

res.status(500).json(err)

}

}


// STUDENT LOGIN
exports.studentLogin = async (req,res)=>{

try{

const {username,password} = req.body

const student = await Student.findOne({username,password})

if(!student){

return res.json({
status:"error",
message:"Invalid Login"
})

}

res.json({
status:"success",
student
})

}catch(err){

res.status(500).json(err)

}

}


// GET STUDENT PROFILE
exports.getStudentById = async (req,res)=>{

try{

const student = await Student.findById(req.params.id)

res.json(student)

}catch(err){

res.status(500).json(err)

}

}
exports.getHostelStats = async (req,res)=>{

const total = await Student.countDocuments()

const inside = await Student.countDocuments({
status:"Inside"
})

const outside = await Student.countDocuments({
status:"Outside"
})

res.json({
total,
inside,
outside
})

}
// ROOM & BED STATS
exports.getRoomStats = async (req,res)=>{

try{

const totalRooms = 125        // 75 boys + 50 girls
const bedsPerRoom = 3
const totalBeds = totalRooms * bedsPerRoom

const students = await Student.find()

const occupiedBeds = students.length

const availableBeds = totalBeds - occupiedBeds

res.json({
totalRooms,
totalBeds,
occupiedBeds,
availableBeds
})

}catch(err){

res.status(500).json(err)

}

}


exports.getRoomStatus = async (req,res)=>{

try{

const students = await Student.find()

let boysRooms = {}
let girlsRooms = {}

for(let i=1;i<=75;i++){
boysRooms[i] = 0
}

for(let i=1;i<=50;i++){
girlsRooms[i] = 0
}

students.forEach(s=>{

if(s.hostelType === "Boys"){
boysRooms[s.roomNumber]++
}

if(s.hostelType === "Girls"){
girlsRooms[s.roomNumber]++
}

})

res.json({
boysRooms,
girlsRooms
})

}catch(err){
res.status(500).json(err)
}

}
exports.getRoomStudents = async (req,res)=>{

try{

const {hostelType,roomNumber} = req.params

const students = await Student.find({
hostelType,
roomNumber
})

res.json(students)

}catch(err){

res.status(500).json(err)

}

}
// SHIFT STUDENT ROOM
exports.shiftStudent = async (req,res)=>{

try{

const {roomNumber,bedNumber,hostelType} = req.body

await Student.findByIdAndUpdate(
req.params.id,
{
roomNumber,
bedNumber,
hostelType
}
)

res.json({
message:"Student shifted successfully"
})

}catch(err){

res.status(500).json(err)

}

}
const MessRequest = require("../models/MessRequest")

exports.getMessRequests = async(req,res)=>{

try{

const requests = await MessRequest.find({
studentId:req.params.id,
status:"Pending"
})

res.json(requests)

}catch(err){
res.status(500).json(err)
}

}
exports.acceptMessRequest = async(req,res)=>{

try{

const request = await MessRequest.findById(req.params.id)

if(!request){
return res.status(404).json({
message:"Request not found"
})
}

// request status update
request.status = "accepted"
await request.save()

const student = await Student.findById(request.studentId)

// add to mess student


const messStudent = new MessStudent({

studentId:student._id,
messId:request.messId,
name:student.fullName,   // ⭐ Student schema field
room:student.roomNumber, // ⭐ Student schema field
joinDate:new Date()


})
await messStudent.save()

res.json({
message:"Mess Joined"
})

}catch(err){

console.log(err)
res.status(500).json(err)

}

}
exports.rejectMessRequest = async(req,res)=>{

try{

await MessRequest.findByIdAndUpdate(
req.params.id,
{status:"Rejected"}
)

res.json({
message:"Request Rejected"
})

}catch(err){
res.status(500).json(err)
}

}
exports.getStudentMessStatus = async (req,res)=>{

try{

const messStudent = await MessStudent.findOne({
studentId:req.params.id
})

if(!messStudent){
return res.json({message:"Not joined mess"})
}

const joinDate = new Date(messStudent.joinDate)
const today = new Date()

const days = Math.floor((today - joinDate)/(1000*60*60*24)) + 1

const amount = days * 100

res.json({
name:messStudent.name,
room:messStudent.room,
days,
amount
})

}catch(err){
res.status(500).json(err)
}

}
exports.getMessRequests = async(req,res)=>{

const requests = await MessRequest.find({
studentId:req.params.id,
status:"Pending"
})

res.json(requests)

}
exports.getStudentMessDetails = async (req,res)=>{

try{

const messStudent = await MessStudent.findOne({
studentId:req.params.studentId
})

if(!messStudent){
return res.json({
message:"Mess not joined"
})
}

const joinDate = new Date(messStudent.joinDate)
const today = new Date()

// days calculation
const days = Math.floor(
(today - joinDate) / (1000*60*60*24)
) + 1

const dailyRate = messStudent.dailyRate || 100

const amount = days * dailyRate

res.json({

name:messStudent.name,
room:messStudent.room,
days:days,
amount:amount

})

}catch(err){

console.log(err)
res.status(500).json(err)

}

}
exports.checkMessJoined = async (req,res)=>{

try{

const messStudent = await MessStudent.findOne({
studentId:req.params.studentId
})

if(!messStudent){
return res.json({
joined:false
})
}

return res.json({
joined:true,
messStudent
})

}catch(err){

console.log(err)
res.status(500).json(err)

}

}