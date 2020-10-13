'use strict';
module.exports = (sequelize, DataTypes) => {
  const Fonction = sequelize.define('Fonction', {
    title: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {});
  Fonction.associate = function(models) {
    // associations can be defined here
    Fonction.hasMany(models.Agent, { foreignKey: 'fonctionId', as: 'agents' });
  };
  return Fonction;
};