const { v4: uuid } = require('uuid');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Institution = sequelize.define('Institution', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    website: DataTypes.STRING,
    logo: DataTypes.STRING,
    image: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {});
  Institution.beforeCreate((res, _) => {
    return res.id = uuid(); 
  });
  Institution.associate = function(models) {
    // associations can be defined here
    Institution.hasMany(models.Agent, { foreignKey: 'institutionId', as: 'agents' });
    Institution.hasMany(models.Prestation, { foreignKey: 'institutionId', as: 'prestations' });
    Institution.hasMany(models.Mutuelle, { foreignKey: 'institutionId', as: 'mutuelles' });
    Institution.hasMany(models.Departement, { foreignKey: 'institutionId', as: 'departements' });

    Institution.belongsTo(models.Type, { foreignKey: 'typeId', as: 'type' });
    Institution.belongsTo(models.Adresse, { foreignKey: 'adresseId', as: 'adresse' });
  };
  return Institution;
};