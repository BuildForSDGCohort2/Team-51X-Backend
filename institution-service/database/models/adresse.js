'use strict';
const { v4: uuid } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  const Adresse = sequelize.define('Adresse', {
    adress1: DataTypes.STRING,
    adress2: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
    country: DataTypes.STRING
  }, {});
  Adresse.beforeCreate((res, _) => {
    return res.id = uuid(); 
  });
  Adresse.associate = function(models) {
    // associations can be defined here
    Adresse.hasMany(models.Agent, { foreignKey: 'adresseId', as: 'agents' });
    Adresse.hasMany(models.Institution, { foreignKey: 'adresseId', as: 'institutions' });
  };
  return Adresse;
};