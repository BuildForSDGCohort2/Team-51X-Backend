const { v4: uuid } = require('uuid');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Agenda = sequelize.define('Agenda', {
    agendaAt: DataTypes.DATE,
    agendaHeure: DataTypes.TIME,
    userId: DataTypes.UUID,
    patientId: DataTypes.UUID,
    status: DataTypes.INTEGER
  }, {});
  Agenda.beforeCreate((res, _) => {
    return res.id = uuid(); 
  });
  Agenda.associate = function(models) {
    // associations can be defined here
    models.Agenda.belongsTo(models.User, { foreignKey: { allowNull: false } });
    models.Agenda.belongsTo(models.Patient, { foreignKey: { allowNull: false } });
  };
  return Agenda;
};