const { v4: uuid } = require('uuid');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Mutuelle = sequelize.define('Mutuelle', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    garantieEffective: DataTypes.INTEGER,
    indicateurTraitement: DataTypes.STRING,
    periodeValidite: DataTypes.DATE,
    status: DataTypes.INTEGER
  }, {});
  Mutuelle.beforeCreate((res, _) => {
    return res.id = uuid(); 
  });
  Mutuelle.associate = function(models) {
    // associations can be defined here
    Mutuelle.belongsTo(models.Institution, { foreignKey: 'institutionId', as: 'institution' });
  };
  return Mutuelle;
};