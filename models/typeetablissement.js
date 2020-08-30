const { v4: uuid } = require('uuid');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const TypeEtablissement = sequelize.define('TypeEtablissement', {
    title: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {});
  TypeEtablissement.beforeCreate((res, _) => {
    return res.id = uuid();
  });
  TypeEtablissement.associate = function(models) {
    // associations can be defined here
    models.TypeEtablissement.hasMany(models.Etablissement);
  };
  return TypeEtablissement;
};