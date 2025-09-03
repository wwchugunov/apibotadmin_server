const Router = require('express')
const router = new Router()

const UsertelegramController = require('../controller/telegramusercontroller')

router.post('/activateusertelegram', UsertelegramController.registration)
router.get('/getuser/:id', UsertelegramController.getMerchant);





module.exports = router