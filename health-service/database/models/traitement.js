const { v4: uuid } = require('uuid');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Traitement = sequelize.define('Traitement', {
    code: DataTypes.STRING,
    debutAt: DataTypes.DATE,
    finAt: DataTypes.DATE,
    intitule: DataTypes.STRING,
    commentaire: DataTypes.TEXT,
    status: DataTypes.INTEGER,
    createdBy: DataTypes.UUID,
    deletedAt: DataTypes.UUID
  }, {});
  Traitement.beforeCreate((res, _) => {
    return res.id = uuid(); 
  });
  Traitement.associate = function(models) {
    // associations can be defined here
    Traitement.hasMany(models.Prescription, { foreignKey: 'traitementId', as: 'prescriptions' });
    Traitement.belongsTo(models.Patient, { foreignKey: 'patientId', as: 'patient' });
  };
  return Traitement;
};