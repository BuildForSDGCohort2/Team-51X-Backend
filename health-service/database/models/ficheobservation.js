const { v4: uuid } = require('uuid');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const FicheObservation = sequelize.define('FicheObservation', {
    code: DataTypes.STRING,
    motif: DataTypes.STRING,
    examem: DataTypes.TEXT,
    anamnese: DataTypes.TEXT,
    synthese: DataTypes.TEXT,
    diagnostic: DataTypes.TEXT,
    status: DataTypes.INTEGER,
    createdBy: DataTypes.UUID,
    deletedAt: DataTypes.DATE
  }, {});
  FicheObservation.beforeCreate((res, _) => {
    return res.id = uuid(); 
  });
  FicheObservation.associate = function(models) {
    // associations can be defined here
    FicheObservation.belongsTo(models.Consultation, { foreignKey: 'consultationId', as: 'consultation' });
    FicheObservation.belongsTo(models.Patient, { foreignKey: 'patientId', as: 'patient' });
  };
  return FicheObservation;
};