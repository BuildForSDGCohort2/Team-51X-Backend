const { v4: uuid } = require('uuid');
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Recettes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: uuid()
      },
      recetteAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      consultationId: {
        allowNull: true,
        type: Sequelize.UUID,
        references:{
          model:'Consultations',
          key:'id'
        }
      },
      prestationId: {
        allowNull: false,
        type: Sequelize.UUID,
        references:{
          model:'Prestations',
          key:'id'
        }
      },
      patientId: {
        allowNull: false,
        type: Sequelize.UUID,
        references:{
          model:'Patients',
          key:'id'
        }
      },
      designation: {
        allowNull: true,
        type: Sequelize.STRING
      },
      pu: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      qte: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      total: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      status: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
        references:{
          model:'Users',
          key:'id'
        }
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
    return queryInterface.dropTable('Recettes');
  }
};