'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Lawyer, Appointment, Cases }) {
      this.hasMany(Lawyer, { foreignKey: 'userId', as: 'admin' });
      this.hasMany(Appointment, { foreignKey: 'userId' });
      this.hasMany(Cases, { foreignKey: 'userID' });
      
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
        validate: {
          isIn: [['user', 'admin']],
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
