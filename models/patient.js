const { v4: uuid } = require('uuid');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define('Patient', {
    civilite: DataTypes.STRING,
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    sexe: DataTypes.STRING,
    dateNaissance: DataTypes.DATE,
    lieuNaissance: DataTypes.STRING,
    cnss: DataTypes.STRING,
    situationFamiliale: DataTypes.STRING,
    profession: DataTypes.STRING,
    groupeSanguin: DataTypes.STRING,
    rfid: DataTypes.STRING,
    adresse: DataTypes.JSON,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    telMobile: DataTypes.STRING,
    telDomicile: DataTypes.STRING,
    telPro: DataTypes.STRING,
    email: DataTypes.STRING,
    mutuelleId: DataTypes.UUID,
    status: DataTypes.INTEGER,
    createdBy: DataTypes.UUID
  }, {});
  Patient.beforeCreate((res, _) => {
    return res.id = uuid(); 
  });
  Patient.associate = function(models) {
    // associations can be defined here
    models.Patient.hasMany(models.Recette);
    models.Patient.hasMany(models.Mesure);
    models.Patient.hasMany(models.Antecedent);
    models.Patient.hasMany(models.Agenda);
    models.Patient.hasMany(models.Vaccin);
    models.Patient.hasMany(models.File);
    models.Patient.hasMany(models.Consultation);
    models.Patient.hasMany(models.Contact);
    models.Patient.hasMany(models.Prescription);
    models.Patient.hasMany(models.Traitement);

    models.Patient.belongsTo(models.Mutuelle, { foreignKey: { allowNull: true } });
  };
  return Patient;
};