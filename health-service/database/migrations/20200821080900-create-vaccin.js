'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Vaccins', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      vaccinAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      patientId: {
        allowNull: false,
        type: Sequelize.UUID,
        references:{
          model:'Patients',
          key:'id'
        }
      },
      categorie: {
        allowNull: false,
        type: Sequelize.STRING
      },
      intitule: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lot: {
        allowNull: false,
        type: Sequelize.STRING
      },
      rappelAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      commentaire: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      status: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      createdBy: {
        allowNull: false,
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
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Vaccins');
  }
};