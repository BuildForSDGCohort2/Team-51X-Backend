const { v4: uuid } = require('uuid');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Etablissement = sequelize.define('Etablissement', {
    typeEtablissementId: DataTypes.UUID,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    website: DataTypes.STRING,
    logo: DataTypes.STRING,
    image: DataTypes.STRING,
    adresse: DataTypes.JSON,
    expiredAt: DataTypes.DATE,
    status: DataTypes.INTEGER
  }, {});
  Etablissement.beforeCreate((res, _) => {
    return res.id = uuid(); 
  });
  Etablissement.associate = function(models) {
    // associations can be defined here
    models.Etablissement.hasMany(models.User);
    models.Etablissement.hasMany(models.Prestation);
    models.Etablissement.hasMany(models.Mutuelle);

    models.Etablissement.belongsTo(models.TypeEtablissement, { foreignKey: { allowNull: false } });
  };
  return Etablissement;
};