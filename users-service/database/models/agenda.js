const { v4: uuid } = require('uuid');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Agenda = sequelize.define('Agenda', {
    agendaAt: DataTypes.DATE,
    agendaHeure: DataTypes.TIME,
    status: DataTypes.INTEGER
  }, {});
  Agenda.beforeCreate((res, _) => {
    return res.id = uuid(); 
  });
  Agenda.associate = function(models) {
    // associations can be defined here
    Agenda.belongsTo(models.User,  { foreignKey: 'userId', as: 'user' });
  };
  return Agenda;
};