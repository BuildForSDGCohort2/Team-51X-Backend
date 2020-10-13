'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Contacts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      patientId: {
        allowNull: false,
        type: Sequelize.UUID,
        references:{
          model:'Patients',
          key:'id'
        }
      },
      nomComplet: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phoneNumber: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      email: {
        allowNull: true,
        type: Sequelize.STRING,
        unique: true
      },
      adresse: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      medecinTraitant: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      medecinReferent: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      correspodant: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      lienFamiliaux: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleteAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Contacts');
  }
};