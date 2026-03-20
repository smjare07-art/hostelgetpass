const express = require("express")
const router = express.Router()

const upload = require("../middlewares/upload")
const feedbackController = require("../controllers/feedbackController")

router.post("/add",upload.single("image"),feedbackController.addFeedback)

router.get("/all",feedbackController.getAllFeedback)

module.exports = router