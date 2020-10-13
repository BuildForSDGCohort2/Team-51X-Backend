const { v4: uuid } = require('uuid');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Analyse = sequelize.define('Analyse', {
    code: DataTypes.STRING,
    analyseAt: DataTypes.DATE,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {});
  Analyse.beforeCreate((res, _) => {
    return res.id = uuid(); 
  });
  Analyse.associate = function(models) {
    // associations can be defined here
    Analyse.belongsTo(models.Patient, { foreignKey: 'patientId', as: 'patient' });
    Analyse.belongsTo(models.Consultation, { foreignKey: 'consultationId', as: 'consultation' });
  };
  return Analyse;
};