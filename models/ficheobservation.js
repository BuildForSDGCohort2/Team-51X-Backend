const { v4: uuid } = require('uuid');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const FicheObservation = sequelize.define('FicheObservation', {
    consultationId: DataTypes.UUID,
    patientId: DataTypes.UUID,
    motif: DataTypes.STRING,
    examem: DataTypes.TEXT,
    anamnese: DataTypes.TEXT,
    synthese: DataTypes.TEXT,
    diagnostic: DataTypes.TEXT,
    status: DataTypes.INTEGER,
    userId: DataTypes.UUID
  }, {});
  FicheObservation.beforeCreate((res, _) => {
    return res.id = uuid(); 
  });
  FicheObservation.associate = function(models) {
    // associations can be defined here
    models.FicheObservation.belongsTo(models.Consultation, { foreignKey: { allowNull: true } });
    models.FicheObservation.belongsTo(models.User, { foreignKey: { allowNull: false } });
    models.FicheObservation.belongsTo(models.Patient, { foreignKey: { allowNull: false } });
  };
  return FicheObservation;
};