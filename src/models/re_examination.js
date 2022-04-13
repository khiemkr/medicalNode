'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Re_Examination extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

        }
    }
    Re_Examination.init({
        idStaff: DataTypes.INTEGER,
        idPatient: DataTypes.INTEGER,
        idTime: DataTypes.INTEGER,
        date: DataTypes.DATE,
        description: DataTypes.TEXT,
        active: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Re_Examination',
    });
    return Re_Examination;
};

