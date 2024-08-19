'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Document extends Model {
    static associate({Lawyer}) {
      this.belongsTo(Lawyer, { foreignKey: 'lawyerID' });
    }
  }
  Document.init({
    filePath: DataTypes.STRING,
    lawyerID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Document',
  });
  return Document;
};