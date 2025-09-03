const jwt = require('jsonwebtoken');
const User = require('../model/model'); 

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.status(401).json({ message: 'Неавторизованный доступ' });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(403).json({ message: 'Доступ запрещен' });

    req.user = await User.findByPk(user.id);
    if (!req.user) return res.status(401).json({ message: 'Пользователь не найден' });

    next();
  });
};

module.exports = authenticateToken;
