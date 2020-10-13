const { v4: uuid } = require('uuid');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Medicament = sequelize.define('Medicament', {
    prixMax: DataTypes.DOUBLE,
    prixMin: DataTypes.DOUBLE,
    status: DataTypes.INTEGER
  }, {});
  Medicament.beforeCreate((res, _) => {
    return res.id = uuid(); 
  });
  Medicament.associate = function(models) {
    // associations can be defined here
    Medicament.belongsTo(models.Produit, { foreignKey: 'produitId', as: 'produit' });
  };
  return Medicament;
};