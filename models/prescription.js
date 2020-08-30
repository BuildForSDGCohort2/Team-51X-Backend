const { v4: uuid } = require('uuid');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Prescription = sequelize.define('Prescription', {
    consultationId: DataTypes.UUID,
    patientId: DataTypes.UUID,
    medicamentId: DataTypes.UUID,
    posologie: DataTypes.STRING,
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
    userId: DataTypes.UUID
  }, {});
  Prescription.beforeCreate((res, _) => {
    return res.id = uuid(); 
  });
  Prescription.associate = function(models) {
    // associations can be defined here
    models.Prescription.belongsTo(models.Consultation, { foreignKey: { allowNull: true } });
    models.Prescription.belongsTo(models.User, { foreignKey: { allowNull: false } });
    models.Prescription.belongsTo(models.Patient, { foreignKey: { allowNull: false } });
    models.Prescription.belongsTo(models.Medicament, { foreignKey: { allowNull: false } });
  };
  return Prescription;
};