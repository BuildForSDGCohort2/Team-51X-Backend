const { v4: uuid } = require('uuid');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Analyse = sequelize.define('Analyse', {
    patientId: DataTypes.UUID,
    consultationId: DataTypes.UUID,
    analyseAt: DataTypes.DATE,
    title: DataTypes.STRING,
    type: DataTypes.STRING,
    stockage: DataTypes.STRING,
    status: DataTypes.INTEGER,
    userId: DataTypes.UUID
  }, {});
  Analyse.beforeCreate((res, _) => {
    return res.id = uuid(); 
  });
  Analyse.associate = function(models) {
    // associations can be defined here
    models.Analyse.belongsTo(models.Patient, { foreignKey: { allowNull: false } });
    models.Analyse.belongsTo(models.Consultation, { foreignKey: { allowNull: true } });
    models.Analyse.belongsTo(models.User, { foreignKey: { allowNull: false } });
  };
  return Analyse;
};