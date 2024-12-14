'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');
    
    await queryInterface.createTable('users', {
      user_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.fn('gen_random_uuid'), 
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      push_notification_token: {
        type: Sequelize.STRING, 
        allowNull: true, 
      },
      device_type: {
        type: Sequelize.ENUM('iOS', 'Android', 'Web'), 
        allowNull: true, 
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  },
};