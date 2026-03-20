const User = require("../models/User")

exports.createUser = async (req,res)=>{
const user = new User(req.body)
await user.save()
res.json(user)
}

exports.getUsers = async (req,res)=>{
const users = await User.find()
res.json(users)
}

exports.deleteUser = async (req,res)=>{
await User.findByIdAndDelete(req.params.id)
res.json({message:"Deleted"})
}

exports.updateUser = async (req,res)=>{
await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
res.json({message:"Updated"})
}