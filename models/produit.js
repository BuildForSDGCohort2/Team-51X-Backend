const { v4: uuid } = require('uuid');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Produit = sequelize.define('Produit', {
    name: DataTypes.STRING,
    posologie: DataTypes.TEXT,
    monographie: DataTypes.TEXT,
    status: DataTypes.INTEGER
  }, {});
  Produit.beforeCreate((res, _) => {
    return res.id = uuid(); 
  });
  Produit.associate = function(models) {
    // associations can be defined here
    models.Produit.hasMany(models.Medicament);
  };
  return Produit;
};