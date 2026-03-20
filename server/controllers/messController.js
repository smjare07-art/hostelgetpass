const Mess = require("../models/Mess")

// create mess admin
exports.createMess = async (req,res)=>{

const mess = new Mess(req.body)

await mess.save()

res.json(mess)

}

// mess login
exports.messLogin = async (req,res)=>{

const {email,password} = req.body

const mess = await Mess.findOne({email,password})

if(!mess){

return res.json({
status:"error"
})

}

res.json({
status:"success",
mess
})

}

// get mess list
exports.getMessList = async (req,res)=>{

const list = await Mess.find()

res.json(list)

}
exports.getMessById = async (req,res)=>{

try{

const mess = await Mess.findById(req.params.id)

if(!mess){
return res.status(404).json({message:"Mess not found"})
}

res.json(mess)

}catch(err){
res.status(500).json(err)
}

}
exports.deleteMess = async (req,res)=>{

try{

await Mess.findByIdAndDelete(req.params.id)

res.json({
message:"Mess deleted"
})

}catch(err){
res.status(500).json(err)
}

}
exports.updateMess = async (req,res)=>{

try{

const mess = await Mess.findByIdAndUpdate(
req.params.id,
req.body,
{new:true}
)

res.json(mess)

}catch(err){
res.status(500).json(err)
}

}
const MessStudent = require("../models/MessStudent")
const EntryLog = require("../models/EntryLog")
const Student = require("../models/Student")

// ADD STUDENT TO MESS
exports.addMessStudent = async (req,res)=>{

try{

const student = await Student.findOne({
fullName:req.body.name
})

if(!student){
return res.status(404).json({message:"Student not found"})
}

const exist = await MessStudent.findOne({
studentId:student._id
})

if(exist){
return res.json({message:"Student already added"})
}

const messStudent = new MessStudent({

studentId:student._id,
messId:req.body.messId,
name:student.fullName,
room:student.roomNumber,
joinDate:new Date()

})
await messStudent.save()

res.json(messStudent)

}catch(err){

console.log(err)
res.status(500).json(err)

}

}


// MESS DASHBOARD
exports.getMessDashboard = async (req,res)=>{

try{

const messStudents = await MessStudent.find()

let result = []

const today = new Date()

for(const m of messStudents){

const joinDate = new Date(m.joinDate)

// days from join to today
let hostelDays = Math.floor((today - joinDate) / (1000*60*60*24)) + 1

const logs = await EntryLog
.find({studentId:m.studentId})
.sort({date:1})

let outsideDays = 0
let exitDate = null

for(const log of logs){

const logDate = new Date(log.date)

// ignore logs before mess join
if(logDate < joinDate) continue

if(log.type === "Exit"){
exitDate = logDate
}

if(log.type === "Entry" && exitDate){

// same day exit-entry ignore
const diff = Math.floor((logDate - exitDate)/(1000*60*60*24))

if(diff > 0){
outsideDays += diff
}

exitDate = null

}

}

const totalDays = hostelDays - outsideDays

const amount = totalDays * 100

result.push({

_id:m._id,     // IMPORTANT
name:m.name,
room:m.room,
days:totalDays,
amount:amount

})
}

res.json(result)

}catch(err){

console.log(err)
res.status(500).json(err)

}

}
exports.getMessDashboard = async (req,res)=>{

try{

const messId = req.params.messId

// FILTER BY MESS
const messStudents = await MessStudent.find({
messId:messId
})

let result = []

const today = new Date()

for(const m of messStudents){

const joinDate = new Date(m.joinDate)

let hostelDays = Math.floor(
(today - joinDate)/(1000*60*60*24)
) + 1

const logs = await EntryLog
.find({studentId:m.studentId})
.sort({date:1})

let outsideDays = 0
let exitDate = null

for(const log of logs){

const logDate = new Date(log.date)

if(logDate < joinDate) continue

if(log.type === "Exit"){
exitDate = logDate
}

if(log.type === "Entry" && exitDate){

const diff = Math.floor(
(logDate - exitDate)/(1000*60*60*24)
)

if(diff > 0){
outsideDays += diff
}

exitDate = null

}

}

const totalDays = hostelDays - outsideDays

const amount = totalDays * 100

result.push({

_id:m._id,
name:m.name,
room:m.room,
days:totalDays,
amount:amount

})

}

res.json(result)

}catch(err){

console.log(err)
res.status(500).json(err)

}

}
exports.deleteMessStudent = async (req,res)=>{

try{

const id = req.params.id

// id check
if(!id || id === "undefined"){
return res.status(400).json({
message:"Invalid student id"
})
}

await MessStudent.findByIdAndDelete(id)

res.json({
message:"Student removed from mess"
})

}catch(err){

console.log(err)
res.status(500).json(err)

}

}
const MessRequest = require("../models/MessRequest")

exports.sendMessRequest = async(req,res)=>{

try{

const student = await Student.findOne({
fullName:req.body.name
})

if(!student){
return res.json({message:"Student not found"})
}

const exist = await MessRequest.findOne({
studentId:student._id,
status:"Pending"
})

if(exist){
return res.json({
message:"Request already sent"
})
}

const request = new MessRequest({

studentId:student._id,
studentName:student.fullName,
messId:req.body.messId

})

await request.save()

res.json({
message:"Request sent to student"
})

}catch(err){

console.log(err)
res.status(500).json(err)

}

}
exports.getMessDashboard = async (req,res)=>{

try{

const messStudents = await MessStudent.find({
messId:req.params.messId
})

res.json(messStudents)

}catch(err){
res.status(500).json(err)
}

}
exports.getMessDashboard = async (req,res)=>{

try{

const messStudents = await MessStudent.find({
messId:req.params.messId
})

let result = []

const today = new Date()

for(const m of messStudents){

const joinDate = new Date(m.joinDate)

const days = Math.floor(
(today - joinDate)/(1000*60*60*24)
) + 1

const amount = days * (m.dailyRate || 100)

result.push({

_id:m._id,
name:m.name,
room:m.room,
days,
amount

})

}

res.json(result)

}catch(err){

console.log(err)
res.status(500).json(err)

}

}