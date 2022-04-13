'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Specialist extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

        }
    }
    Specialist.init({
        departmentName: DataTypes.STRING,
        price: DataTypes.INTEGER,
        image: DataTypes.STRING,
        description: DataTypes.TEXT,
        active: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Specialist',
    });
    return Specialist;
};

