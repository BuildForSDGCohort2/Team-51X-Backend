'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Prescriptions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      code: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      consultationId: {
        allowNull: true,
        type: Sequelize.UUID,
        references:{
          model:'Consultations',
          key:'id'
        }
      },
      traitementId: {
        allowNull: false,
        type: Sequelize.UUID,
        references:{
          model:'Traitements',
          key:'id'
        }
      },
      medicamentId: {
        allowNull: false,
        type: Sequelize.UUID
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
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Prescriptions');
  }
};