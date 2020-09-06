const { v4: uuid } = require('uuid');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    roleId: DataTypes.UUID,
    etablissementId: DataTypes.UUID,
    departementId: DataTypes.UUID,
    matricule: DataTypes.STRING,
    civilite: DataTypes.STRING,
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    sexe: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    secutiteSocial: DataTypes.STRING,
    adresse: DataTypes.JSON,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    lastConnexion: DataTypes.DATE,
    expireAt: DataTypes.DATE,
    status: DataTypes.INTEGER
  }, {});
  User.beforeCreate((res, _) => {
    return res.id = uuid(); 
  });
  User.associate = function(models) {
    // associations can be defined here
    models.User.hasMany(models.Courrier);
    models.User.hasMany(models.CompteRendu);
    models.User.hasMany(models.Mesure);
    models.User.hasMany(models.Agenda);
    models.User.hasMany(models.Consultation);
    models.User.hasMany(models.File);
    models.User.hasMany(models.Recette);
    models.User.hasMany(models.Vaccin);
    models.User.hasMany(models.Analyse);
    models.User.hasMany(models.Traitement);
    models.User.hasMany(models.FicheObservation);
    models.User.hasMany(models.Prescription);

    models.User.belongsTo(models.Role, { foreignKey: { allowNull: false } });
    models.User.belongsTo(models.Etablissement, { foreignKey: { allowNull: true } });
    models.User.belongsTo(models.Departement, { foreignKey: { allowNull: true } });
  };
  return User;
};