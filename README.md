# 📌 Админ-панель для управления пользователями Telegram-бота

## 🚀 Стек технологий
- **Backend:** Node.js, Express, Sequelize, PostgreSQL, node-telegram-bot-api

## 📖 Описание проекта
Веб-админка для создания пользователей в телеграм боте 



- **src/config/**  
  - `db_config.js` — настройки подключения к базе данных  
- **src/controller/**  
  - `handleCallbackController.js` — обработка callback платежей  
  - `merchantController.js` — CRUD операции с мерчантами  
  - `telegramuserController.js` — регистрация пользователей через Telegram  
  - `userController.js` — управление пользователями админ-панели  
- **src/error/**  
  - `botsenderror.js` — шаблон обработки ошибок  
- **src/middleware/**  
  - `authenticateToken.js` — проверка JWT-токенов  
  - `authMiddleware.js` — проверка авторизации  
  - `ErrorHandlingMiddleware.js` — централизованная обработка ошибок  
  - `roleMiddleware.js` — проверка ролей пользователя  
- **src/model/**  
  - `model.js` — модели пользователей и ролей  
- **src/router/**  
  - `handleCallbackRouter.js` — роуты callback платежей  
  - `merchantRouter.js` — роуты CRUD мерчантов  
  - `telegrambotRouter.js` — роуты Telegram-бота  
  - `userRouter.js` — роуты управления пользователями  
  - `index.js` — центральный роутер  

### ⚡ Корневые файлы сервера
- `index.js` — точка входа сервера (Express)  
- `telegram.js` — логика работы Telegram-бота  
- `start.js` — скрипт запуска приложения  

---

