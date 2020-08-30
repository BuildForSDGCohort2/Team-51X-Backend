const { v4: uuid } = require('uuid');
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Prescriptions', {
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
      medicamentId: {
        allowNull: false,
        type: Sequelize.UUID,
        references:{
          model:'Medicaments',
          key:'id'
        }
      },
      posologie: {
        allowNull: false,
        type: Sequelize.STRING
      },
      voieAdmin: {
        allowNull: false,
        type: Sequelize.STRING
      },
      qte: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      unite: {
        allowNull: false,
        type: Sequelize.STRING
      },
      frequence: {
        allowNull: false,
        type: Sequelize.STRING
      },
      duree: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      ligne: {
        allowNull: false,
        type: Sequelize.STRING
      },
      prise: {
        allowNull: false,
        type: Sequelize.STRING
      },
      heure: {
        allowNull: false,
        type: Sequelize.STRING
      },
      repas: {
        allowNull: false,
        type: Sequelize.STRING
      },
      commentaire: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      result: {
        allowNull: false,
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Prescriptions');
  }
};