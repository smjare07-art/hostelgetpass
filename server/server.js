const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const securityRoutes = require("./routes/securityRoutes")
const feedbackRoutes = require("./routes/feedbackRoutes")
const userRoutes = require("./routes/userRoutes")
const studentRoutes = require("./routes/studentRoutes")
const gatepassRoutes = require("./routes/gatepassRoutes")
const paymentRoutes = require("./routes/paymentRoutes")
const messRoutes = require("./routes/messRoutes")
const app = express()

app.use(cors())
app.use(express.json())

// image folder
app.use("/uploads", express.static("uploads"))

// database
mongoose.connect("mongodb://127.0.0.1:27017/hostelDB")
.then(()=>console.log("MongoDB Connected"))

// routes
app.use("/users", userRoutes)
app.use("/students", studentRoutes)


app.use("/gatepass",gatepassRoutes)


app.use("/security",securityRoutes)


app.use("/gatepass", gatepassRoutes)

app.use("/payment", paymentRoutes)
app.use("/feedback",feedbackRoutes)
app.use("/mess",messRoutes)
app.listen(5000,()=>{
console.log("Server running on 5000")
})