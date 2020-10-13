const { v4: uuid } = require('uuid');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const CompteRendu = sequelize.define('CompteRendu', {
    modele: DataTypes.STRING,
    message: DataTypes.JSON,
    status: DataTypes.INTEGER,
    createdBy: DataTypes.UUID,
    deletedAt: DataTypes.DATE
  }, {});
  CompteRendu.beforeCreate((res, _) => {
    return res.id = uuid(); 
  });
  CompteRendu.associate = function(models) {
    // associations can be defined here
  };
  return CompteRendu;
};