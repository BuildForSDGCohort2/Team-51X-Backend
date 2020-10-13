const { v4: uuid } = require('uuid');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recette = sequelize.define('Recette', {
    consultationId: DataTypes.UUID,
    patientId: DataTypes.UUID,
    recetteAt: DataTypes.DATE,
    designation: DataTypes.STRING,
    pu: DataTypes.INTEGER,
    qte: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {});
  Recette.beforeCreate((res, _) => {
    return res.id = uuid(); 
  });
  Recette.associate = function(models) {
    // associations can be defined here
    Recette.belongsTo(models.Prestation, { foreignKey: 'prestationId', as: 'prestation' });
    Recette.belongsTo(models.Agent, { foreignKey: 'agentId', as: 'agent' });
  };
  return Recette;
};