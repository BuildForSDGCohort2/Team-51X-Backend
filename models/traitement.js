const { v4: uuid } = require('uuid');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Traitement = sequelize.define('Traitement', {
    patientId: DataTypes.UUID,
    medicamentId: DataTypes.UUID,
    debutAt: DataTypes.DATE,
    finAt: DataTypes.DATE,
    intitule: DataTypes.STRING,
    commentaire: DataTypes.TEXT,
    status: DataTypes.INTEGER,
    userId: DataTypes.UUID
  }, {});
  Traitement.beforeCreate((res, _) => {
    return res.id = uuid(); 
  });
  Traitement.associate = function(models) {
    // associations can be defined here
    models.Traitement.belongsTo(models.Patient, { foreignKey: { allowNull: false } });
    models.Traitement.belongsTo(models.Medicament, { foreignKey: { allowNull: false } });
    models.Traitement.belongsTo(models.User, { foreignKey: { allowNull: false } });
  };
  return Traitement;
};