const Router = require('express')
const router = new Router()
const telegram_bot_router = require('./telegrambotrouter')
const userrouter = require('./userrouter')
const merchantRouter = require('./merchantRouter')
const handleCallbackController = require('./handleCallbackRouter')


router.use('/user', userrouter)
router.use('/registrtelegrambot', telegram_bot_router)
router.use('/merchant', merchantRouter)
router.use("/bot", handleCallbackController);


 
module.exports = router

