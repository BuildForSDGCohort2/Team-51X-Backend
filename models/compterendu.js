const { v4: uuid } = require('uuid');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const CompteRendu = sequelize.define('CompteRendu', {
    userId: DataTypes.UUID,
    compteRenduAt: DataTypes.DATE,
    modele: DataTypes.STRING,
    message: DataTypes.JSON,
    status: DataTypes.INTEGER
  }, {});
  CompteRendu.beforeCreate((res, _) => {
    return res.id = uuid(); 
  });
  CompteRendu.associate = function(models) {
    // associations can be defined here
    models.CompteRendu.belongsTo(models.User, { foreignKey: { allowNull: false } });
  };
  return CompteRendu;
};