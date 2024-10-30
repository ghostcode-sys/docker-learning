const GetUsername = require("../contorller")

const express = require("express")

const router = express.Router()

router.route("/user").get(GetUsername)
module.exports = router