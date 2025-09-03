const db = require("../model/model");

class UserbotController {
  
  async getAllUserbots(req, res) {
    try {
      const userbots = await db.userbot.findAll();
      res.json(userbots);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  }

  async createUserbot(req, res) {
    try {
      const newUserbot = await db.userbot.create(req.body);
      res.status(201).json(newUserbot);
    } catch (error) {
      console.error(error);
      res.status(400).send("Bad request");
    }
  }

  async updateUserbot(req, res) {
    try {
      const { id } = req.params;
      const updatedUserbot = await db.userbot.update(req.body, {
        where: { id: Number(id) },
        returning: true,
      });
      res.json(updatedUserbot[0]);
    } catch (error) {
      console.error(error);
      res.status(404).send("Not found");
    }
  }

  async deleteUserbot(req, res) {
    try {
      const { id } = req.params;
      const deletedRows = await db.userbot.destroy({
        where: { id: Number(id) },
      });
      if (deletedRows > 0) {
        res.status(204).end();
      } else {
        res.status(404).send("Not found");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  }

  async updateTerminalsByTelephoneTelegram(req, res) {
    try {
      const { telephone_telegram, terminals } = req.body;

      if (!telephone_telegram || !terminals) {
        return res
          .status(400)
          .send("Missing required fields: telephone_telegram or terminals");
      }

      const [affectedRows] = await db.userbot.update(
        { terminals },
        {
          where: { telephone_telegram },
        }
      );

      if (affectedRows > 0) {
        const updatedUserbot = await db.userbot.findOne({
          where: { telephone_telegram },
        });

        res.json({
          message: "Terminals updated successfully",
          data: updatedUserbot,
        });
      } else {
        res.status(404).send("Record not found");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  }

  async sendbtn(req, res) {
    console.log(req.body);
    const { chatId, callbackData } = req.body;
    return res.send("готово");
  }

  async editUserbot(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const [updated] = await db.userbot.update(updateData, {
        where: { id: id },
      });
      if (updated) {
        const updatedUserbot = await db.userbot.findOne({ where: { id: id } });
        res.status(200).json({
          message: "Userbot updated successfully",
          userbot: updatedUserbot,
        });
      } else {
        res.status(404).json({ message: "Userbot not found" });
      }
    } catch (error) {
      console.error("Error updating userbot:", error);
      res.status(500).json({
        message: "An error occurred while updating the userbot",
        error: error.message,
      });
    }
  }

  async getMerchant(req, res) {
    const { id } = req.params;

    try {
      const foundUserbot = await db.userbot.findByPk(id);

      if (!foundUserbot) {
        return res.status(404).json({ message: "Userbot not found" });
      }

      res.status(200).json(foundUserbot);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = new UserbotController();
