const { v4: uuid } = require('uuid');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define('File', {
    fileAt: DataTypes.DATE,
    patientId: DataTypes.UUID,
    title: DataTypes.STRING,
    type: DataTypes.STRING,
    extension: DataTypes.STRING,
    stockage: DataTypes.STRING,
    status: DataTypes.STRING,
    userId: DataTypes.UUID
  }, {});
  File.beforeCreate((res, _) => {
    return res.id = uuid(); 
  });
  File.associate = function(models) {
    // associations can be defined here
    models.File.belongsTo(models.User, { foreignKey: { allowNull: false } });
    models.File.belongsTo(models.Patient, { foreignKey: { allowNull: false } });
  };
  return File;
};