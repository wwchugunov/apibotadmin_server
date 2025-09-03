const sequelize = require('../config/db_config')
const { Sequelize, DataTypes, Table } = require('sequelize')



const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  login: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  enrollment_date: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.NOW },
  role: { type: DataTypes.ENUM('admin', 'user', 'moderator'),allowNull: false, defaultValue: 'user'}
  }, 
  {
    timestamps: true
  }
);



const userbot = sequelize.define("userbot", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    chatid: {type: DataTypes.STRING, allowNull: true,},
    telephone_telegram: {type: DataTypes.STRING, allowNull: false,validate: { len: [10, 15] },},
    terminals: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
    email: {type: DataTypes.STRING,allowNull: false,validate: { isEmail: true },},
    enrollment_date: {type: DataTypes.DATE,allowNull: false,defaultValue: DataTypes.NOW,},
    registered_by: { type: DataTypes.STRING, allowNull: false },
    company_name: { type: DataTypes.STRING, allowNull: false },
    full_name: { type: DataTypes.STRING, allowNull: false },
  },
  {timestamps: true}
);


module.exports = { User, userbot };


