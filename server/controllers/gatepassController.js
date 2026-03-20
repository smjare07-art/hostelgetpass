
const GatePass = require("../models/GatePass")
const QRCode = require("qrcode")
const sendMail = require("../utils/sendMail")
const EntryLog = require("../models/EntryLog")
const Student = require("../models/Student")

// APPLY GATE PASS
exports.applyGatePass = async (req,res)=>{
try{

const pass = new GatePass(req.body)

await pass.save()

res.json(pass)

}catch(err){
res.status(500).json(err)
}
}


// GET ALL PASSES (Admin)
exports.getPasses = async (req,res)=>{
try{

const passes = await GatePass
.find()
.populate("studentId","fullName roomNumber")

res.json(passes)

}catch(err){
res.status(500).json(err)
}
}


// APPROVE PASS
exports.approvePass = async (req,res)=>{
try{

const pass = await GatePass.findById(req.params.id)

const qr = await QRCode.toDataURL(pass._id.toString())

pass.status = "Approved"
pass.qrCode = qr

await pass.save()

res.json(pass)

}catch(err){
res.status(500).json(err)
}
}


// GET STUDENT GATEPASS HISTORY
exports.getStudentPassHistory = async (req,res)=>{
try{

const passes = await GatePass.find({
studentId:req.params.id
})

res.json(passes)

}catch(err){
res.status(500).json(err)
}
}


// GET APPROVED PASS
exports.getApprovedPass = async (req,res)=>{
try{

const pass = await GatePass
.findOne({
studentId:req.params.id,
status:"Approved"
})
.sort({_id:-1})

res.json(pass)

}catch(err){
res.status(500).json(err)
}
}


// SCAN GATE PASS (ENTRY / EXIT SEPARATE)
exports.scanGatePass = async (req,res)=>{

try{

const {gatepassId,type} = req.body

const pass = await GatePass.findById(gatepassId)

if(!pass){
return res.json({message:"Invalid Gate Pass"})
}

if(pass.used){
return res.json({message:"QR Code Already Used"})
}

const student = await Student.findById(pass.studentId)

const now = new Date()
const date = now.toLocaleDateString()
const time = now.toLocaleTimeString()

// EXIT SCAN
if(type === "exit"){

if(pass.scanCount !== 0){
return res.json({message:"Exit Already Done"})
}

student.status = "Outside"
pass.scanCount = 1

await pass.save()
await student.save()

const log = new EntryLog({
studentId:student._id,
type:"Exit",
date:date,
time:time
})

await log.save()

await sendMail(
student.email,
"Hostel Gate Pass Alert",
`Dear Parent,

Your child ${student.fullName} has Exit the hostel.

Date: ${date}
Time: ${time}

Hostel Security System`
)

return res.json({
message:"Exit Recorded",
scanCount:pass.scanCount
})

}


// ENTRY SCAN
if(type === "entry"){

if(pass.scanCount !== 1){
return res.json({message:"Exit Not Done Yet"})
}

student.status = "Inside"

pass.scanCount = 2
pass.used = true

await pass.save()
await student.save()

const log = new EntryLog({
studentId:student._id,
type:"Entry",
date:date,
time:time
})

await log.save()

await sendMail(
student.email,
"Hostel Gate Pass Alert",
`Dear Parent,

Your child ${student.fullName} has Entered the hostel.

Date: ${date}
Time: ${time}

Hostel Security System`
)

return res.json({
message:"Entry Recorded",
scanCount:pass.scanCount
})

}

}catch(err){
res.status(500).json(err)
}

}


// GET ENTRY LOGS
exports.getEntryLogs = async (req,res)=>{

const logs = await EntryLog
.find({studentId:req.params.id})
.sort({_id:-1})

res.json(logs)

}
