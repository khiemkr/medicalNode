'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Doctor_Time', {
      idStaff: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      idSpecialist: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        
      },
      image: {
        type: Sequelize.STRING
      },
      level: {
        type: Sequelize.STRING
      },
      contentHTML: {
        type: Sequelize.TEXT,
      },
      contentMarkdown: {
        type: Sequelize.TEXT,
      },
      description: {
        type: Sequelize.TEXT
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Doctor_Info');
  }
};