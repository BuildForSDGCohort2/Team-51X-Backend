'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Patients', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      afiaId: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      mutuelleId: {
        allowNull: true,
        type: Sequelize.UUID
      },
      adresseId: {
        allowNull: false,
        type: Sequelize.UUID,
        references:{
          model:'Adresses',
          key:'id'
        }
      },
      prenom: {
        allowNull: false,
        type: Sequelize.STRING
      },
      nom: {
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
        type: Sequelize.STRING,
        unique: true
      },
      situationFamiliale: {
        allowNull: true,
        type: Sequelize.STRING
      },
      profession: {
        allowNull: true,
        type: Sequelize.STRING
      },
      groupeSanguin: {
        allowNull: true,
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
      avatar: {
        allowNull: true,
        type: Sequelize.STRING
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
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Patients');
  }
};