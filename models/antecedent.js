const { v4: uuid } = require('uuid');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Antecedent = sequelize.define('Antecedent', {
    key: DataTypes.STRING,
    value: DataTypes.STRING,
    isSecure: DataTypes.BOOLEAN,
    patientId: DataTypes.UUID,
    createdBy: DataTypes.UUID
  }, {});
  Antecedent.beforeCreate((res, _) => {
    return res.id = uuid(); 
  });
  Antecedent.associate = function(models) {
    // associations can be defined here
    models.Antecedent.belongsTo(models.Patient, { foreignKey: { allowNull: false } });
  };
  return Antecedent;
};