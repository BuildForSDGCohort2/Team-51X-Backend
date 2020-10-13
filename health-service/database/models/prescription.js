const { v4: uuid } = require('uuid');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Prescription = sequelize.define('Prescription', {
    code: DataTypes.STRING,
    posologie: DataTypes.STRING,
    medicamentId: DataTypes.UUID,
    voieAdmin: DataTypes.STRING,
    qte: DataTypes.DOUBLE,
    unite: DataTypes.STRING,
    frequence: DataTypes.STRING,
    duree: DataTypes.INTEGER,
    ligne: DataTypes.STRING,
    prise: DataTypes.STRING,
    heure: DataTypes.STRING,
    repas: DataTypes.STRING,
    commentaire: DataTypes.TEXT,
    result: DataTypes.STRING,
    status: DataTypes.INTEGER,
    createdBy: DataTypes.UUID,
    deletedAt: DataTypes.DATE
  }, {});
  Prescription.beforeCreate((res, _) => {
    return res.id = uuid(); 
  });
  Prescription.associate = function(models) {
    // associations can be defined here
    Prescription.belongsTo(models.Consultation, { foreignKey: 'consultationId', as: 'consultation' });
    Prescription.belongsTo(models.Traitement, { foreignKey: 'traitementId', as: 'traitement' });
  };
  return Prescription;
};