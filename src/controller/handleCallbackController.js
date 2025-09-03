const { userbot } = require("../model/model");
const axios = require("axios");
const { Op } = require("sequelize");

const handleCallback = async (req, res) => {
  try {
    const { merchant, ...messageData } = req.body;

    console.log("Received data:", req.body);
    console.log("Merchant:", merchant);

    const users = await userbot.findAll({
      where: {
        terminals: { [Op.contains]: [merchant] },
      },
    });

    console.log(`Found ${users.length} users with terminal: ${merchant}`);

    if (users.length > 0) {
      const token =  process.env.BOT_TOKEN;
      const url = `https://api.telegram.org/bot${token}/sendMessage`;

      // Format massages for users 
      let message = `<b>Операція по торговцю:</b> ${merchant}\n`;

      if (messageData.respDesc === "Successful") {
        message += `<b>Статус:</b> <b>Успішно ✅</b>\n`;
      } else if (messageData.respDesc === "declined") {
        message += `<b>Статус:</b> <b>Відхилена ❌</b>\n`;
      } else if (messageData.respDesc === "processing") {
        message += `<b>Статус:</b> <b>В обробці ⏳ </b>\n`;
      } else if (messageData.respDesc === "404") {
        message += `<b>Статус:</b> <b>404  ❌</b>\n`;
      }

      if (messageData.respDesc !== "Successful") {
        message += `<b>Опис статусу:</b> ${messageData.respDesc}\n`;
      }

      let amount = messageData.amount;
      message += `<b>Сума:</b> ${amount} <b>грн</b>\n`;
      message += `<b>Дата операції:</b> <b>${messageData.create_date}</b>\n`;
      message += `<b>Карта:</b> ${messageData.pan}\n`;
      message += `<b>Ідентифікатор транзакції:</b> ${messageData.tran_id}\n`;

      for (const user of users) {
        if (user.chatid) {
          console.log(`Sending message to user with chatid: ${user.chatid}`);

          await axios.post(url, {
            chat_id: user.chatid,
            text: message,
            parse_mode: "HTML",
          });

          console.log(`Message sent to user with chatid: ${user.chatid}`);
        }
      }

      res.status(200).send("Message sent successfully to all relevant users");
    } else {
      res.status(404).send("No users found with the specified terminal");
    }
  } catch (error) {
    console.error("Error handling callback:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = handleCallback;
