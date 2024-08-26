'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cases extends Model {
    static associate({User}) {
      this.belongsTo(User, { foreignKey: 'userID' });
    }
  }
  Cases.init({
    title: DataTypes.STRING, 
    description: DataTypes.TEXT, 
    photo1: DataTypes.STRING, 
    photo2: DataTypes.STRING, 
    photo3: DataTypes.STRING, 
    photo4: DataTypes.STRING, 
    photo5: DataTypes.STRING 
  }, {
    sequelize,
    modelName: 'Cases',
  });
  return Cases;
};