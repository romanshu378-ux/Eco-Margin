// EcoMargin — User Model (Sequelize)
// src/models/User.js
'use strict'

const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/database')
const bcrypt = require('bcryptjs')

class User extends Model {
  // Instance method — compare passwords
  async comparePassword(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password)
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: { len: [2, 100] },
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('user', 'operator', 'admin'),
      defaultValue: 'user',
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'banned'),
      defaultValue: 'active',
    },
    avatar: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    is_email_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    email_verify_token: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    password_reset_token: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    password_reset_expires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    wallet_balance: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00,
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, parseInt(process.env.BCRYPT_ROUNDS) || 12)
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          user.password = await bcrypt.hash(user.password, parseInt(process.env.BCRYPT_ROUNDS) || 12)
        }
      },
    },
    defaultScope: {
      attributes: { exclude: ['password', 'email_verify_token', 'password_reset_token', 'password_reset_expires'] },
    },
    scopes: {
      withPassword: { attributes: {} },
    },
  },
)

module.exports = User
