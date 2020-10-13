const { v4: uuid } = require('uuid');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define('File', {
    fileAt: DataTypes.DATE,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.STRING,
    createdBy: DataTypes.UUID,
    deletedAt: DataTypes.DATE
  }, {});
  File.beforeCreate((res, _) => {
    return res.id = uuid(); 
  });
  File.associate = function(models) {
    // associations can be defined here
    File.belongsTo(models.Analyse, { foreignKey: 'analyseId', as: 'analyse' });
    File.belongsTo(models.Patient, { foreignKey: 'patientId', as: 'patient' });
  };
  return File;
};