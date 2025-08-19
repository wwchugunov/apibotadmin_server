const express = require("express");
const router = express.Router();
const userbotController = require("../controller/merchantController");

router.post("/userbotscreate", userbotController.createUserbot);
router.post("/userbotsupdate/:id", userbotController.updateUserbot);
router.delete("/userbots/:id", userbotController.deleteUserbot);
router.post("/userbots/update-terminals", userbotController.updateTerminalsByTelephoneTelegram);
router.get("/userbots/terminals", userbotController.findTerminalByKey);
router.post("/userbots/sendbtn", userbotController.sendbtn);
router.get("/api/getmerchant", userbotController.getAllUserbots);
router.get("/api/getmerchant/edit/:id", userbotController.editUserbot);
router.get("/api/getmerchant/:id", userbotController.getMerchant); // Добавленный маршрут

module.exports = router;
