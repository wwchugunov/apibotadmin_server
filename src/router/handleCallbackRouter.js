const express = require("express");
const router = express.Router();
const handleCallback = require("../controller/handleCallbackController"); 

router.post("/handleCallback", handleCallback);

module.exports = router;
