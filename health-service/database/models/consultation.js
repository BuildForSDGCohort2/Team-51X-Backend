const { v4: uuid } = require('uuid');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Consultation = sequelize.define('Consultation', {
    code: DataTypes.STRING,
    consultationAt: DataTypes.DATE,
    createdBy: DataTypes.UUID
  }, {});
  Consultation.beforeCreate((res, _) => {
    return res.id = uuid(); 
  });
  Consultation.associate = function(models) {
    // associations can be defined here
    Consultation.hasMany(models.Analyse, { foreignKey: 'consultationId', as: 'analyses' });
    Consultation.hasMany(models.FicheObservation, { foreignKey: 'consultationId', as: 'ficheobservations' });
    Consultation.hasMany(models.Prescription, { foreignKey: 'consultationId', as: 'prescriptions' });

    Consultation.belongsTo(models.Patient, { foreignKey: 'patientId', as: 'patient' });
  };
  return Consultation;
};