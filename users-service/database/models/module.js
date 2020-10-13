'use strict';
module.exports = (sequelize, DataTypes) => {
  const Module = sequelize.define('Module', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {});
  Module.associate = function (models) {
    // associations can be defined here
    Module.hasMany(models.Event, { foreignKey: 'moduleId', as: 'events' });
  };
  return Module;
};