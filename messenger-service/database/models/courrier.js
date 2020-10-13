const { v4: uuid } = require('uuid');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Courrier = sequelize.define('Courrier', {
    from: DataTypes.UUID,
    to: DataTypes.TEXT,
    modele: DataTypes.STRING,
    objet: DataTypes.STRING,
    message: DataTypes.TEXT,
    status: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {});
  Courrier.beforeCreate((res, _) => {
    return res.id = uuid(); 
  });
  Courrier.associate = function(models) {
    // associations can be defined here
  };
  return Courrier;
};