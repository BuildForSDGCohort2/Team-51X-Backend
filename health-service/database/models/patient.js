const { v4: uuid } = require('uuid');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define('Patient', {
    afiaId: DataTypes.STRING,
    userId: DataTypes.UUID,
    mutuelleId: DataTypes.UUID,
    prenom: DataTypes.STRING,
    nom: DataTypes.STRING,
    sexe: DataTypes.STRING,
    dateNaissance: DataTypes.DATE,
    lieuNaissance: DataTypes.STRING,
    securiteSocial: DataTypes.STRING,
    situationFamiliale: DataTypes.STRING,
    profession: DataTypes.STRING,
    groupeSanguin: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    avatar: DataTypes.STRING,
    status: DataTypes.INTEGER,
    createdBy: DataTypes.UUID,
    deletedAt: DataTypes.DATE
  }, {});
  Patient.beforeCreate(async (patient) => {
    return patient.id = uuid(); 
  });
  Patient.associate = function(models) {
    // associations can be defined here
    Patient.hasMany(models.Mesure, { foreignKey: 'patientId', as: 'mesures' });
    Patient.hasMany(models.Antecedent, { foreignKey: 'patientId', as: 'antecedents' });
    Patient.hasMany(models.Vaccin, { foreignKey: 'patientId', as: 'vaccins' });
    Patient.hasMany(models.File, { foreignKey: 'patientId', as: 'files' });
    Patient.hasMany(models.Consultation, { foreignKey: 'patientId', as: 'consultations' });
    Patient.hasMany(models.Contact, { foreignKey: 'patientId', as: 'contacts' });
    Patient.hasMany(models.Traitement, { foreignKey: 'patientId', as: 'traitements' });
    Patient.hasMany(models.FicheObservation, { foreignKey: 'patientId', as: 'ficheObservations' });
    Patient.hasMany(models.Analyse, { foreignKey: 'patientId', as: 'analyses' });

    Patient.belongsTo(models.Adresse, { foreignKey: 'adresseId', as: 'adresse' });
  };
  return Patient;
};