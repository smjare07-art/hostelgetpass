const express = require("express")
const router = express.Router()

const {
createSecurity,
getSecurity,
securityLogin,
updateStatus,
deleteSecurity,
updateSecurity
} = require("../controllers/securityController")

router.post("/create",createSecurity)

router.get("/all",getSecurity)

router.post("/login",securityLogin)

router.put("/status/:id",updateStatus)
router.delete("/security/:id", deleteSecurity)
router.put("/security/:id", updateSecurity)
module.exports = router