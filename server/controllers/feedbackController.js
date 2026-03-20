const Feedback = require("../models/Feedback")

// Add Feedback
exports.addFeedback = async (req,res)=>{

try{

const {studentId,message,rating} = req.body

let image = ""

if(req.file){
image = req.file.filename
}

const feedback = new Feedback({
studentId,
message,
rating,
image
})

await feedback.save()

res.json({message:"Feedback submitted successfully"})

}catch(err){
res.status(500).json({error:err.message})
}

}


// Get All Feedback
exports.getAllFeedback = async (req,res)=>{

try{

const feedbacks = await Feedback
.find()
.populate("studentId","name email")

res.json(feedbacks)

}catch(err){
res.status(500).json({error:err.message})
}

}