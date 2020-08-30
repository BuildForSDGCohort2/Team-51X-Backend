const { v4: uuid } = require('uuid');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recette = sequelize.define('Recette', {
    recetteAt: DataTypes.DATE,
    consultationId: DataTypes.UUID,
    prestationId: DataTypes.UUID,
    patientId: DataTypes.UUID,
    designation: DataTypes.STRING,
    pu: DataTypes.INTEGER,
    qte: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    userId: DataTypes.UUID
  }, {});
  Recette.beforeCreate((res, _) => {
    return res.id = uuid(); 
  });
  Recette.associate = function(models) {
    // associations can be defined here
    models.Recette.belongsTo(models.Consultation, { foreignKey: { allowNull: true } });
    models.Recette.belongsTo(models.Prestation, { foreignKey: { allowNull: false } });
    models.Recette.belongsTo(models.Patient, { foreignKey: { allowNull: false } });
    models.Recette.belongsTo(models.User, { foreignKey: { allowNull: false } });
  };
  return Recette;
};