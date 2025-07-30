const sequelize = require('../config/db_user');
const transporter = require('../config/transporter')
const User = require('./User');

module.exports = {
  transporter,
  sequelize,
  User
};
