'use strict';
const { v4: uuid } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define('Log', {
    logAt: DataTypes.DATE,
    userAgent: DataTypes.JSON,
    ipAdress: DataTypes.STRING,
    geolocation: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {});
  Log.beforeCreate((res, _) => {
    return res.id = uuid(); 
  });
  Log.associate = function(models) {
    // associations can be defined here
    Log.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Log.belongsTo(models.Event, { foreignKey: 'eventId', as: 'event' });
  };
  return Log;
};