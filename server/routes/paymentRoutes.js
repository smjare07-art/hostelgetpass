const express = require("express")
const router = express.Router()

const {
createOrder,
paymentSuccess,
getPaymentHistory,
downloadReceipt,
getFeeAnalytics,
downloadPendingFeePDF
} = require("../controllers/paymentController")

router.post("/create-order",createOrder)

router.post("/success",paymentSuccess)
router.get("/history/:id",getPaymentHistory)
router.get("/receipt/:id",downloadReceipt)
router.get("/analytics",getFeeAnalytics)
router.get("/pending-fee-report",downloadPendingFeePDF)
module.exports = router