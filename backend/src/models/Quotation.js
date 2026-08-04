// EcoMargin — Quotation Model (Sequelize)
// src/models/Quotation.js
'use strict'

const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../config/database')

class Quotation extends Model {}

Quotation.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    lead_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    quotation_no: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    customer_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    customer_email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    customer_company: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    product_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0.00,
    },
    gst_amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0.00,
    },
    installation_charges: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0.00,
    },
    total_amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0.00,
    },
    status: {
      type: DataTypes.ENUM('Draft', 'Generated', 'Sent', 'Accepted', 'Expired'),
      allowNull: false,
      defaultValue: 'Generated',
    },
    pdf_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    validity_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    warranty_terms: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    terms_and_conditions: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    items_json: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_by: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: 'Sales Admin',
    },
  },
  {
    sequelize,
    modelName: 'Quotation',
    tableName: 'quotations',
    timestamps: true,
    underscored: true,
    indexes: [
      { fields: ['lead_id'] },
      { fields: ['quotation_no'] },
      { fields: ['status'] },
    ],
  }
)

module.exports = Quotation
