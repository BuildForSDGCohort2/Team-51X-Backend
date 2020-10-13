'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Prestations', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      institutionId: {
        allowNull: false,
        type: Sequelize.UUID,
        references:{
          model:'Institutions',
          key:'id'
        }
      },
      code: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      montant: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      devise: {
        allowNull: false,
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
    return queryInterface.dropTable('Prestations');
  }
};