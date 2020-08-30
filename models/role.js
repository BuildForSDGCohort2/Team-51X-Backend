const { v4: uuid } = require('uuid');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    title: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {});
  Role.beforeCreate((res, _) => {
    return res.id = uuid();
  });
  Role.associate = function(models) {
    // associations can be defined here
    models.Role.hasMany(models.User);
  };
  return Role;
};