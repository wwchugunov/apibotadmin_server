const { userbot } = require("../model/model");

class UsertelegramController {
  async registration(req, res) {
    console.log(req.body);
    try {
      const { telephone_telegram, chatid } = req.body;
      const user = await userbot.findOne({
        where: { telephone_telegram },
      });

      if (user) {
        user.chatid = chatid;
        await user.save();
        const enrollmentDate = user.enrollment_date
          ? new Date(user.enrollment_date).toLocaleDateString()
          : "Дата регистрации неизвестна";
        
        return res.status(200).json({
          telephone_telegram: user.telephone_telegram || "Телефон неизвестен",
          company_name: user.company_name || "Компания неизвестна",
          full_name: user.full_name || "ФИО неизвестно",
          enrollment_date: enrollmentDate,
          terminals: user.terminals,
        });
      } else {
        return res.status(404).json({
          message: "Account not registered. Please contact the manager.",
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "An error occurred during registration.",
        error: error.message,
      });
    }
  }

  async getMerchant(req, res) {
    const { id } = req.params;

    try {
        const foundUserbot = await userbot.findByPk(id);

        if (!foundUserbot) {
            return res.status(404).json({ message: 'Userbot not found' });
        }

        res.status(200).json(foundUserbot);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}




}

module.exports = new UsertelegramController();
