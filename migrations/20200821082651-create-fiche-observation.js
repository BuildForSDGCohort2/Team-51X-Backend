const { v4: uuid } = require('uuid');
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('FicheObservations', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: uuid()
      },
      consultationId: {
        allowNull: true,
        type: Sequelize.UUID,
        references:{
          model:'Consultations',
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
      motif: {
        allowNull: true,
        type: Sequelize.STRING
      },
      examem: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      anamnese: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      synthese: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      diagnostic: {
        allowNull: true,
        type: Sequelize.TEXT
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
    return queryInterface.dropTable('FicheObservations');
  }
};