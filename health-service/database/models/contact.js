const { v4: uuid } = require('uuid');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    nomComplet: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    adresse: DataTypes.TEXT,
    medecinTraitant: DataTypes.BOOLEAN,
    medecinReferent: DataTypes.BOOLEAN,
    correspodant: DataTypes.BOOLEAN,
    lienFamiliaux: DataTypes.BOOLEAN
  }, {});
  Contact.beforeCreate((res, _) => {
    return res.id = uuid(); 
  });
  Contact.associate = function(models) {
    // associations can be defined here
    Contact.belongsTo(models.Patient, { foreignKey: 'patientId', as: 'patient' });
  };
  return Contact;
};