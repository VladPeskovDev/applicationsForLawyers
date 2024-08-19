'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lawyer extends Model {
    static associate({User, Document, Appointment, Portfolio}) {
      this.belongsTo(User, { foreignKey: 'userID', as: 'admin' });
      this.hasMany(Document, { foreignKey: 'lawyerID' });
      this.hasMany(Appointment, { foreignKey: 'lawyerID' });
      this.hasMany(Portfolio, { foreignKey: 'lawyerID' });
    }
  }
  Lawyer.init({
    name: DataTypes.STRING,
    education: DataTypes.STRING,
    description: DataTypes.TEXT,
    photo: DataTypes.STRING,
    phone: DataTypes.STRING,
    telegram: DataTypes.STRING,
    userID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Lawyer',
  });
  return Lawyer;
};