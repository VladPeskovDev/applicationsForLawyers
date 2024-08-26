'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lawyer extends Model {
    static associate({User, Document, Appointment, Portfolio}) {
      this.belongsTo(User, { foreignKey: 'userId', as: 'admin' });
      this.hasMany(Document, { foreignKey: 'lawyerID' });
      this.hasMany(Appointment, { foreignKey: 'lawyerID' });
    }
  }
  Lawyer.init({
    name: DataTypes.STRING,
    education: DataTypes.STRING,
    description: DataTypes.TEXT,
    photo: DataTypes.STRING,
    phone: DataTypes.STRING,
    telegram: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Lawyer',
  });
  return Lawyer;
};