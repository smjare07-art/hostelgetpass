const express = require("express")
const router = express.Router()

const {

createUser,
getUsers,
deleteUser,
updateUser

} = require("../controllers/userController")

router.post("/create",createUser)

router.get("/all",getUsers)

router.delete("/:id",deleteUser)

router.put("/:id",updateUser)

module.exports = router