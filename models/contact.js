const { v4: uuid } = require('uuid');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    patientId: DataTypes.UUID,
    medecinTraitant: DataTypes.UUID,
    medecinReferent: DataTypes.UUID,
    correspodant: DataTypes.UUID,
    lienFamiliaux: DataTypes.UUID
  }, {});
  Contact.beforeCreate((res, _) => {
    return res.id = uuid(); 
  });
  Contact.associate = function(models) {
    // associations can be defined here
    models.Contact.belongsTo(models.Patient, { foreignKey: { allowNull: false } });
  };
  return Contact;
};