const express = require("express");
const router = express.Router();
const userbotController = require("../controller/merchantController");

router.post("/create", userbotController.createUserbot); // создать
router.post("/update/:id", userbotController.updateUserbot);
router.delete("/delete/:id", userbotController.deleteUserbot); // Удалить
router.post("/update-terminals", userbotController.updateTerminalsByTelephoneTelegram);
router.post("/sendbtn", userbotController.sendbtn);
router.get("/api/all", userbotController.getAllUserbots);
router.get("/api/getmerchant/edit/:id", userbotController.editUserbot);
router.get("/api/getmerchant/:id", userbotController.getMerchant); // Добавленный маршрут

module.exports = router;
