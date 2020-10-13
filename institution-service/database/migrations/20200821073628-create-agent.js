const { v4: uuid } = require('uuid');
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Agents', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: uuid()
      },
      fonctionId: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED,
        references:{
          model:'Fonctions',
          key:'id'
        }
      },
      institutionId: {
        allowNull: true,
        type: Sequelize.UUID,
        references:{
          model:'Institutions',
          key:'id'
        }
      },
      departementId: {
        allowNull: true,
        type: Sequelize.UUID,
        references:{
          model:'Departements',
          key:'id'
        }
      },
      adresseId: {
        allowNull: false,
        type: Sequelize.UUID,
        references:{
          model:'Adresses',
          key:'id'
        }
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      matricule: {
        allowNull: true,
        type: Sequelize.STRING
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
      securiteSocial: {
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
    return queryInterface.dropTable('Agents');
  }
};