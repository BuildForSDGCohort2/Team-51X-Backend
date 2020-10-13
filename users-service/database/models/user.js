const { v4: uuid } = require('uuid');
// const bcrypt = require('bcryptjs');

'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    prenom: DataTypes.STRING,
    nom: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    expiresAt: DataTypes.DATE,
    verified: DataTypes.BOOLEAN,
    refreshToken: DataTypes.TEXT,
    status: DataTypes.INTEGER,
    avatar: DataTypes.STRING,
    sessionAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {});
  User.beforeCreate(async (user) => {
    // user.password = await user.generatePasswordHash();
    return user.id = uuid(); 
  });
  // User.prototype.generatePasswordHash = function () {
  //   if (this.password) {
  //     return bcrypt.hashSync(this.password, bcrypt.genSaltSync(12));
  //   }
  // };
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Log, { foreignKey: 'userId', as: 'logs' });
    User.belongsTo(models.Role, { foreignKey: 'roleId', as: 'role' });
  };
  return User;
};