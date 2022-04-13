'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Staff extends Model {
   
    static associate(models) {

  
    }
  }
  Staff.init({
    name: DataTypes.STRING, 
    email: DataTypes.STRING,  
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    idRole: DataTypes.INTEGER,
    phoneNumber: DataTypes.STRING,
    image: DataTypes.STRING,
    active: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Staff',
  });


  return Staff;
};

