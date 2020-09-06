const { v4: uuid } = require('uuid');
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Patients', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: uuid()
      },
      civilite: {
        allowNull: false,
        type: Sequelize.STRING
      },
      nom: {
        allowNull: false,
        type: Sequelize.STRING
      },
      prenom: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sexe: {
        allowNull: false,
        type: Sequelize.STRING
      },
      dateNaissance: {
        allowNull: false,
        type: Sequelize.DATE
      },
      lieuNaissance: {
        allowNull: false,
        type: Sequelize.STRING
      },
      securiteSocial: {
        allowNull: true,
        type: Sequelize.STRING
      },
      situationFamiliale: {
        allowNull: false,
        type: Sequelize.STRING
      },
      profession: {
        allowNull: true,
        type: Sequelize.STRING
      },
      groupeSanguin: {
        allowNull: false,
        type: Sequelize.STRING
      },
      rfid: {
        allowNull: true,
        type: Sequelize.STRING
      },
      adresse: {
        allowNull: false,
        type: Sequelize.JSON
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      telMobile: {
        allowNull: true,
        type: Sequelize.STRING
      },
      telDomicile: {
        allowNull: true,
        type: Sequelize.STRING
      },
      telPro: {
        allowNull: true,
        type: Sequelize.STRING
      },
      email: {
        allowNull: true,
        type: Sequelize.STRING
      },
      mutuelleId: {
        allowNull: true,
        type: Sequelize.UUID,
        references:{
          model:'Mutuelles',
          key:'id'
        }
      },
      status: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      createdBy: {
        allowNull: true,
        type: Sequelize.UUID
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Patients');
  }
};