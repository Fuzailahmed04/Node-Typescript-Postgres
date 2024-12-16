'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Enable the pgcrypto extension for UUID generation in PostgreSQL
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');
    
    // Create the 'users' table with 'user_id' as UUID and primary key
    await queryInterface.createTable('users', {
      user_id: {
        type: Sequelize.UUID, // Use UUID instead of INTEGER
        primaryKey: true,
        defaultValue: Sequelize.fn('gen_random_uuid'), // Use gen_random_uuid() for UUID generation
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
    // Drop the 'users' table when rolling back the migration
    await queryInterface.dropTable('users');
  },
};
