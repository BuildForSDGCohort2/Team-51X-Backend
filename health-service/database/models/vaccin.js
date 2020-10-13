const { v4: uuid } = require('uuid');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vaccin = sequelize.define('Vaccin', {
    vaccinAt: DataTypes.DATE,
    patientId: DataTypes.UUID,
    categorie: DataTypes.STRING,
    intitule: DataTypes.STRING,
    lot: DataTypes.STRING,
    rappelAt: DataTypes.DATE,
    commentaire: DataTypes.TEXT,
    status: DataTypes.INTEGER,
    createdBy: DataTypes.UUID,
    deletedAt: DataTypes.DATE
  }, {});
  Vaccin.beforeCreate((res, _) => {
    return res.id = uuid(); 
  });
  Vaccin.associate = function(models) {
    // associations can be defined here
    Vaccin.belongsTo(models.Patient, { foreignKey: 'patientId', as: 'patient' });
  };
  return Vaccin;
};