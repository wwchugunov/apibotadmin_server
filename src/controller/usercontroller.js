const bcrypt = require('bcrypt');
const { User } = require('../model/model');
const jwt = require('jsonwebtoken');

// JWT
const generateJwt = (id, login, role) => {
  return jwt.sign(
    { id, login, role },
    process.env.SECRET_KEY,
    { expiresIn: '24h' }
  );
};

class UserController {
  async registration(req, res, next) {
    try {
      const { login, password, role } = req.body;  
      if (!login || !password) {
        return res.status(400).json({ message: "Некорректный логин или пароль" });
      }
      const candidate = await User.findOne({ where: { login } });
      if (candidate) {
        return res.status(400).json({ message: "Пользователь уже зарегистрирован!" });
      }

      // if (role && req.user?.role !== "admin") {
      //   return res.status(403).json({ message: "Нет доступа для создания пользователя" });
      // }. 
      // Починить !


      const finalRole = role || 'user';
      
      
      const hashPassword = await bcrypt.hash(password, 5);
      const createdUser = await User.create({ login, password: hashPassword, role: finalRole });
      const token = generateJwt(createdUser.id, createdUser.login, createdUser.role);
      return res.status(201).json({ token});
    } catch (error) {
      console.error("Ошибка регистрации", error);
      next(error);
    }
  }

  async login(req, res) {
    try {
      const { login, password } = req.body;
      if (!login || !password) {
        return res.status(400).json({ message: "Некорректный логин или пароль" });
      }
      const foundUser = await User.findOne({ where: { login } });
      if (!foundUser) {
        return res.status(404).json({ message: "Пользователь не найден!" });
      }
      const comparePassword = await bcrypt.compare(password, foundUser.password);
      if (!comparePassword) {
        return res.status(401).json({ message: "Неверный пароль" });
      }
      const token = generateJwt(foundUser.id, foundUser.login, foundUser.role);
      return res.status(200).json({ token, role: foundUser.role , id: foundUser.id});
    } catch (error) {
      console.error("Ошибка входа:", error);
      res.status(500).json({ message: "Серверная ошибка", error });
    }
  }

  async check(req, res) {
    try {
      const token = generateJwt(req.user.id, req.user.login, req.user.role);
      return res.json({ token });
    } catch (error) {
      console.error("Ошибка получения токена:", error);
      res.status(500).json({ message: "Нет токена", error });
    }
  }

  async profile(req, res) {
    try {
      const userInfo = req.user;
      if (!userInfo) {
        return res.status(401).json({ message: "Не авторизован" });
      }
      res.json({ id: userInfo.id, login: userInfo.login, role: userInfo.role });
    } catch (error) {
      console.error("Ошибка получения пользователя", error);
      res.status(500).json({ message: "Произошла ошибка при получении информации о пользователе" });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await User.findAll(); 
      res.json(users);
    } catch (error) {
      console.error("Ошибка при получении пользователей", error);
      res.status(500).json({ message: "Ошибка при получении пользователей" });
    }
  }

  async getUserRole(req, res) {
    try {
      const user = req.user;
      if (!user) {
        return res.status(401).json({ message: 'Неавторизованный доступ' });
      }
      const userFromDb = await User.findByPk(user.id);
      if (!userFromDb) {
        return res.status(401).json({ message: 'Пользователь не найден' });
      }
      res.json({ role: userFromDb.role });
    } catch (error) {
      console.error('Ошибка при получении роли пользователя:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params; 
      const { login, password, role } = req.body;

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }

      if (login) user.login = login;
      if (password) user.password = await bcrypt.hash(password, 5);
      if (role) user.role = role; 

      await user.save(); 
      res.json({ message: 'Пользователь успешно обновлен' });
    } catch (error) {
      console.error('Ошибка при обновлении пользователя:', error);
      res.status(500).json({ message: 'Ошибка при обновлении пользователя' });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params; 

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }

      await user.destroy(); 
      res.json({ message: 'Пользователь успешно удален' });
    } catch (error) {
      console.error('Ошибка при удалении пользователя:', error);
      res.status(500).json({ message: 'Ошибка при удалении пользователя' });
    }
  }
}

module.exports = new UserController();
