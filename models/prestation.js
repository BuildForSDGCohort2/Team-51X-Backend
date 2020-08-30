const { v4: uuid } = require('uuid');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Prestation = sequelize.define('Prestation', {
    etablissementId: DataTypes.UUID,
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
    models.Prestation.hasMany(models.Recette);

    models.Prestation.belongsTo(models.Etablissement, { foreignKey: { allowNull: false } });
  };
  return Prestation;
};