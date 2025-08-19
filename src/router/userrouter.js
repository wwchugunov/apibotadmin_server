const Router = require('express');
const router = new Router();
const UserController = require('../controller/usercontroller');
const authMiddleware = require('../middleware/authMiddleweare');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/registration',   UserController.registration); // Регистрация
router.post('/login', UserController.login);  // Логин
router.get('/profile', authMiddleware, UserController.profile);  // Получить информацию о пользователе 
router.get('/alluser', authMiddleware, roleMiddleware('admin'), UserController.getAllUsers);  // Все пользователи 
router.get('/role', authMiddleware, UserController.getUserRole); 
router.delete('/users/:id', UserController.deleteUser); // Удалить 
router.put('/users/:id', UserController.updateUser);





module.exports = router;
