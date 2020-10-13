'use strict';
module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define('Type', {
    title: DataTypes.STRING
  }, {});
  Type.associate = function(models) {
    // associations can be defined here
    Type.hasMany(models.Institution, { foreignKey: 'typeId', as: 'institutions' });
  };
  return Type;
};