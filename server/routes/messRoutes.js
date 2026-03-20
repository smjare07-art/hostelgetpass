const express = require("express")
const router = express.Router()

const {
createMess,
messLogin,
getMessList,
getMessById,
addMessStudent,
getMessDashboard,
deleteMess,
updateMess,
deleteMessStudent,
sendMessRequest
} = require("../controllers/messController")

const MessRequest = require("../models/MessRequest") // IMPORTANT

router.post("/create", createMess)

router.post("/login", messLogin)

router.get("/all", getMessList)

router.get("/dashboard/:messId", getMessDashboard)

router.post("/add-student", addMessStudent)

router.delete("/student/:id", deleteMessStudent)

router.post("/send-request", sendMessRequest)

// GET ALL REQUESTS

router.get("/requests/:messId", async (req,res)=>{
 try{

   const requests = await MessRequest.find({
     messId:req.params.messId,
     status:"pending"
   })

   res.json(requests)

 }catch(err){

   console.log(err)
   res.status(500).json(err)

 }
})
router.get("/:id", getMessById)

router.delete("/:id", deleteMess)

router.put("/:id", updateMess)

module.exports = router