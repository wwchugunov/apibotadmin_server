const User = require('../model/model'); 

const authorizeRoles = (...roles) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        console.log('Пользователь не найден в запросе');
        return res.status(401).json({ message: 'Неавторизованный доступ' });
      }

      const user = req.user;
      console.log('Проверка роли пользователя:', user.role);
      if (!roles.includes(user.role)) {
        console.log('Доступ запрещен для роли:', user.role);
        return res.status(403).json({ message: 'Доступ запрещен' });
      }

      next();
    } catch (error) {
      console.error('Ошибка в middleware авторизации ролей:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  };
};

module.exports = authorizeRoles;
