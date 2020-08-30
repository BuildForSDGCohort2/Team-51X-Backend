const { v4: uuid } = require('uuid');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Courrier = sequelize.define('Courrier', {
    userId: DataTypes.UUID,
    courrierAt: DataTypes.DATE,
    to: DataTypes.TEXT,
    modele: DataTypes.STRING,
    objet: DataTypes.STRING,
    message: DataTypes.JSON,
    status: DataTypes.INTEGER
  }, {});
  Courrier.beforeCreate((res, _) => {
    return res.id = uuid(); 
  });
  Courrier.associate = function(models) {
    // associations can be defined here
    models.Courrier.belongsTo(models.User, { foreignKey: { allowNull: false } });
  };
  return Courrier;
};