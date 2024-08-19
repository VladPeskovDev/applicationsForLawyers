'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Portfolio extends Model {
    static associate({Lawyer}) {
      this.belongsTo(Lawyer, { foreignKey: 'lawyerID' });
    }
  }
  Portfolio.init({
    filePath: DataTypes.STRING,
    lawyerID: DataTypes.INTEGER,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Portfolio',
  });
  return Portfolio;
};