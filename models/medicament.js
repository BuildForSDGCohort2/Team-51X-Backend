const { v4: uuid } = require('uuid');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Medicament = sequelize.define('Medicament', {
    produitId: DataTypes.UUID,
    prixMax: DataTypes.DOUBLE,
    prixMin: DataTypes.DOUBLE,
    status: DataTypes.INTEGER
  }, {});
  Medicament.beforeCreate((res, _) => {
    return res.id = uuid(); 
  });
  Medicament.associate = function(models) {
    // associations can be defined here
    models.Medicament.hasMany(models.Prescription);

    models.Medicament.belongsTo(models.Produit, { foreignKey: { allowNull: false } });
  };
  return Medicament;
};