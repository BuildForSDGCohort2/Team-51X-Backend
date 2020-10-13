'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Recettes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      recetteAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      prestationId: {
        allowNull: false,
        type: Sequelize.UUID,
        references:{
          model:'Prestations',
          key:'id'
        }
      },
      agentId: {
        allowNull: false,
        type: Sequelize.UUID,
        references:{
          model:'Agents',
          key:'id'
        }
      },
      consultationId: {
        allowNull: true,
        type: Sequelize.UUID,
      },
      patientId: {
        allowNull: false,
        type: Sequelize.UUID
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
    return queryInterface.dropTable('Recettes');
  }
};