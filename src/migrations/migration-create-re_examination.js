'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Re_Examinations', {
        idRe_examination: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idStaff: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Staff', key: 'idStaff' },
      },
      idPatient: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Patient', key: 'idPatient' },
      },
      idTime: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Examination_Hours', key: 'idTime' },
      },
      date: {
        type: Sequelize.DATE
      },
      description: {
        type: Sequelize.TEXT
      },
      active: {
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Re_Examinations');
  }
};