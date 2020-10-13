'use strict';
const { v4: uuid } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    title: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {});
  Event.beforeCreate((res, _) => {
    return res.id = uuid(); 
  });
  Event.associate = function(models) {
    // associations can be defined here
    Event.hasMany(models.Log, { foreignKey: 'eventId', as: 'logs' });
    Event.belongsTo(models.Module, { foreignKey: 'moduleId', as: 'module' });
  };
  return Event;
};