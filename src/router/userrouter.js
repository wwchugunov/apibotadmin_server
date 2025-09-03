const Router = require('express');
const router = new Router();
const UserController = require('../controller/usercontroller');
const authMiddleware = require('../middleware/authMiddleweare');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/registration',   UserController.registration); 
router.post('/login', UserController.login);  
router.get('/profile', authMiddleware, UserController.profile);
router.get('/alluser', authMiddleware, roleMiddleware('admin'), UserController.getAllUsers); 
router.get('/role', authMiddleware, UserController.getUserRole); 
router.delete('/users/:id', UserController.deleteUser); 
router.put('/users/:id', UserController.updateUser);





module.exports = router;
