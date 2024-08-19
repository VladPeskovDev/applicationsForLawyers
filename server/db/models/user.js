'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({Lawyer, Appointment}) {
      this.hasMany(Lawyer, { foreignKey: 'userId', as:'admin' });
      this.hasMany(Appointment, { foreignKey: 'userId' });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user', 
      validate: {
        isIn: [['user', 'admin']] 
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};