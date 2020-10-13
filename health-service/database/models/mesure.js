const { v4: uuid } = require('uuid');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Mesure = sequelize.define('Mesure', {
    key: DataTypes.STRING,
    value: DataTypes.STRING,
    createdBy: DataTypes.UUID
  }, {});
  Mesure.beforeCreate((res, _) => {
    return res.id = uuid(); 
  });
  Mesure.associate = function(models) {
    // associations can be defined here
    Mesure.belongsTo(models.Patient, { foreignKey: 'patientId', as: 'patient' });
  };
  return Mesure;
};