'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Antecedents', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      key: {
        allowNull: false,
        type: Sequelize.STRING
      },
      value: {
        allowNull: false,
        type: Sequelize.STRING
      },
      isSecure: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: 1
      },
      patientId: {
        allowNull: false,
        type: Sequelize.UUID,
        references:{
          model:'Patients',
          key:'id'
        }
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
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Antecedents');
  }
};