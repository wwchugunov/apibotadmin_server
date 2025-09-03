const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
const token = process.env.BOT_TOKEN
const bot = new TelegramBot(token, { polling: true });
const url = process.env.BOT_URL_REG_USER;
const userState = {};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "👋 Привіт! Щоб продовжити, поділіться своїм номером телефону.",
    {
      reply_markup: {
        keyboard: [
          [
            {
              text: "📞 Поділитися номером телефону",
              request_contact: true,
            },
          ],
        ],
        one_time_keyboard: true,
        resize_keyboard: true,
      },
    }
  );
});

const cleanPhoneNumber = (phoneNumber) => {
  return phoneNumber.replace(/[^\d]/g, "");
};

bot.on("contact", async (msg) => {
  const chatId = msg.chat.id;
  let phoneNumber = msg.contact.phone_number;

  phoneNumber = cleanPhoneNumber(phoneNumber);

  if (!phoneNumber) {
    return bot.sendMessage(
      chatId,
      "⚠️ Телефонний номер не вказано. Будь ласка, спробуйте ще раз."
    );
  }

  try {
    const response = await axios.post(url, {
      telephone_telegram: phoneNumber,
      chatid: chatId,
    });

    const data = response.data;

    if (!data || !data.telephone_telegram) {
      bot.sendMessage(
        chatId,
        "🔍 Ваші дані не знайдено. Переконайтеся, що ви правильно подали номер телефону."
      );
    } else {
      const terminalsString = data.terminals
        ? data.terminals.join(", ")
        : "Терміни не вказані";

      const message = `
        🎉 Ваш акаунт успішно активований!
        📞 Телефон: ${data.telephone_telegram || "Телефон не зазначено"}
        🏢 Компанія: ${data.company_name || "Компанія не зазначена"}
        👤 ПІБ: ${data.full_name || "ПІБ не зазначено"}
        📅 Зареєстровано: ${
          data.enrollment_date || "Дата реєстрації невідома"
        }
        📋 Мерчант: ${terminalsString}
      `;

      bot.sendMessage(chatId, message, {
        reply_markup: {
          keyboard: [
            [
              {
                text: "📄 Особисті дані",
              },
            ],
          ],
          resize_keyboard: true,
          one_time_keyboard: false,
        },
      });
    }
  } catch (error) {
    console.error("Помилка при отриманні даних з сервера:", error);
    bot.sendMessage(
      chatId,
      "❌ Нажаль, акаунт не знайдено в системі. Зверніться до менеджера для уточнення інформації. ❌"
    );
  }
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "📄 Особисті дані") {
    userState[chatId] = { action: "get_info" };

    bot.sendMessage(
      chatId,
      "📝 Щоб отримати інформацію про ваш акаунт, поділіться своїм номером телефону.",
      {
        reply_markup: {
          keyboard: [
            [
              {
                text: "📞 Поділитися номером телефону",
                request_contact: true,
              },
            ],
          ],
          one_time_keyboard: true,
          resize_keyboard: true,
        },
      }
    );
  }
});

bot.on("polling_error", (error) => console.log(`Polling error: ${error}`));
