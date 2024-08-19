'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    static associate({Lawyer, User}) {
      this.belongsTo(Lawyer, { foreignKey: 'lawyerID' });
      this.belongsTo(User, { foreignKey: 'userId'});
    }
  }
  Appointment.init({
    date: DataTypes.DATE,
    time: DataTypes.TIME,
    lawyerID: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
};