const express = require("express")
const router = express.Router()

const upload = require("../middleware/upload")

const {
createStudent,
getStudents,
deleteStudent,
updateStudent,
studentLogin,
getStudentById,
getHostelStats,
getRoomStatus,
getRoomStudents,
shiftStudent,
getMessRequests,
acceptMessRequest,
rejectMessRequest,
getStudentMessStatus,
getStudentMessDetails,
checkMessJoined
} = require("../controllers/studentController")

// CREATE STUDENT
router.post("/create", upload.single("photo"), createStudent)

// LOGIN
router.post("/login", studentLogin)

// GET ALL STUDENTS
router.get("/all", getStudents)

// PROFILE
router.get("/profile/:id", getStudentById)

// HOSTEL STATS
router.get("/stats", getHostelStats)

// ROOM STATUS
router.get("/rooms/status", getRoomStatus)

// ROOM STUDENTS
router.get("/room/:hostelType/:roomNumber", getRoomStudents)

// SHIFT STUDENT
router.put("/shift/:id", shiftStudent)


// -------- MESS --------

// student pending requests
router.get("/mess-request/:id", getMessRequests)

// accept
router.put("/mess-accept/:id", acceptMessRequest)

// reject
router.put("/mess-reject/:id", rejectMessRequest)
router.get("/mess-joined/:studentId", checkMessJoined)
// mess status
router.get("/mess-status/:id", getStudentMessStatus)

router.get("/mess-details/:studentId", getStudentMessDetails)
// -------- CRUD --------

// update
router.put("/:id", upload.single("photo"), updateStudent)

// delete
router.delete("/:id", deleteStudent)

module.exports = router