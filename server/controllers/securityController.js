const Security = require("../models/Security")

// create security
exports.createSecurity = async(req,res)=>{

const security = new Security(req.body)

await security.save()

res.json(security)

}

// get all security
exports.getSecurity = async(req,res)=>{

const guards = await Security.find()

res.json(guards)

}

// login security
exports.securityLogin = async(req,res)=>{

const {email,password} = req.body

const guard = await Security.findOne({email,password})

if(!guard){

return res.json({status:"error"})

}

res.json({
status:"success",
guard
})

}

// update status
exports.updateStatus = async(req,res)=>{

const guard = await Security.findById(req.params.id)

guard.status = req.body.status

await guard.save()

res.json(guard)

}
// delete security
exports.deleteSecurity = async (req,res)=>{

try{

await Security.findByIdAndDelete(req.params.id)

res.json({
message:"Security deleted"
})

}catch(err){
res.status(500).json(err)
}

}
exports.updateSecurity = async (req,res)=>{

try{

const guard = await Security.findByIdAndUpdate(
req.params.id,
req.body,
{new:true}
)

res.json(guard)

}catch(err){
res.status(500).json(err)
}

}