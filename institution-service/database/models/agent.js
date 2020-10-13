const { v4: uuid } = require('uuid');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Agent = sequelize.define('Agent', {
    userId: DataTypes.UUID,
    matricule: DataTypes.STRING,
    civilite: DataTypes.STRING,
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    sexe: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    securiteSocial: DataTypes.STRING,
    avatar: DataTypes.STRING,
    status: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {});
  Agent.beforeCreate(async (agent) => {
    return agent.id = uuid(); 
  });
  Agent.associate = function(models) {
    // associations can be defined here
    Agent.hasMany(models.Recette, { foreignKey: 'agentId', as: 'recettes' });

    Agent.belongsTo(models.Fonction, { foreignKey: 'fonctionId', as: 'fonction' });
    Agent.belongsTo(models.Institution, { foreignKey: 'institutionId', as: 'institution' });
    Agent.belongsTo(models.Departement, { foreignKey: 'departementId', as: 'departement' });
    Agent.belongsTo(models.Adresse, { foreignKey: 'adresseId', as: 'adresse' });
  };
  return Agent;
};