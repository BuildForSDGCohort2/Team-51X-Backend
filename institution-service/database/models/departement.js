const { v4: uuid } = require('uuid');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Departement = sequelize.define('Departement', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.INTEGER
  }, {});
  Departement.beforeCreate((res, _) => {
    return res.id = uuid(); 
  });
  Departement.associate = function(models) {
    // associations can be defined here
    Departement.hasMany(models.Agent, { foreignKey: 'departementId', as: 'agents' });
    Departement.belongsTo(models.Institution, { foreignKey: 'institutionId', as: 'institution' });
  };
  return Departement;
};