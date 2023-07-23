const { DataTypes } = require('sequelize')
const { db } = require('./../database/config')

const Repair = db.define('repairs', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'cancelled', 'completed'),
    allowNull: false,
    defaultValue: 'pending',
  },
  userid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',
  },
})

module.exports = Repair
