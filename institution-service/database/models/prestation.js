const { v4: uuid } = require('uuid');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Prestation = sequelize.define('Prestation', {
    code: DataTypes.STRING,
    title: DataTypes.STRING,
    montant: DataTypes.INTEGER,
    devise: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {});
  Prestation.beforeCreate((res, _) => {
    return res.id = uuid(); 
  });
  Prestation.associate = function(models) {
    // associations can be defined here
    Prestation.hasMany(models.Recette, { foreignKey: 'prestationId', as: 'recettes' });
    Prestation.belongsTo(models.Institution, { foreignKey: 'institutionId', as: 'institution' });
  };
  return Prestation;
};