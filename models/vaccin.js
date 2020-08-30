const { v4: uuid } = require('uuid');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vaccin = sequelize.define('Vaccin', {
    vaccinAt: DataTypes.DATE,
    patientId: DataTypes.UUID,
    categorie: DataTypes.STRING,
    intitule: DataTypes.STRING,
    lot: DataTypes.STRING,
    rappelAt: DataTypes.DATE,
    commentaire: DataTypes.TEXT,
    status: DataTypes.INTEGER,
    userId: DataTypes.UUID
  }, {});
  Vaccin.beforeCreate((res, _) => {
    return res.id = uuid(); 
  });
  Vaccin.associate = function(models) {
    // associations can be defined here
    models.Vaccin.belongsTo(models.User, { foreignKey: { allowNull: false } });
    models.Vaccin.belongsTo(models.Patient, { foreignKey: { allowNull: false } });
  };
  return Vaccin;
};