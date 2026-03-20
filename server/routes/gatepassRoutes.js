const express = require("express")
const router = express.Router()

const {
applyGatePass,
getPasses,
approvePass,
getStudentPassHistory,
getApprovedPass,
scanGatePass,
getEntryLogs
} = require("../controllers/gatepassController")

router.post("/apply",applyGatePass)

router.get("/all",getPasses)

router.put("/approve/:id",approvePass)

router.get("/student/:id",getStudentPassHistory)

// approved pass for student dashboard
router.get("/approved/:id",getApprovedPass)
router.post("/scan", scanGatePass)
router.get("/logs/:id",getEntryLogs)
module.exports = router