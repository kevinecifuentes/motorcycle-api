const { DataTypes } = require('sequelize')
const { db } = require('./../database/config')
const { now } = require('sequelize/types/utils')

const Repair = db.define('repairs', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: now,
  },
  userId: {
    defaultValue: null,
    allowNull: true,
    field: 'user_id',
  },
  status: {
    type: DataTypes.ENUM('pending', 'cancelled', 'completed'),
    allowNull: false,
    defaultValue: 'pending',
  },
})

module.exports = Repair
