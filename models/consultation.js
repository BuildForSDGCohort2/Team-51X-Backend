const { v4: uuid } = require('uuid');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Consultation = sequelize.define('Consultation', {
    consultationAt: DataTypes.DATE,
    patientId: DataTypes.UUID,
    userId: DataTypes.UUID
  }, {});
  Consultation.beforeCreate((res, _) => {
    return res.id = uuid(); 
  });
  Consultation.associate = function(models) {
    // associations can be defined here
    models.Consultation.hasMany(models.Recette);
    models.Consultation.hasMany(models.Analyse);
    models.Consultation.hasMany(models.FicheObservation);
    models.Consultation.hasMany(models.Prescription);

    models.Consultation.belongsTo(models.User, { foreignKey: { allowNull: false } });
    models.Consultation.belongsTo(models.Patient, { foreignKey: { allowNull: false } });
  };
  return Consultation;
};