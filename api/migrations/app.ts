'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('app', {
      id: {
        type: Sequelize.UUID, 
        primaryKey: true,
        defaultValue: Sequelize.fn('gen_random_uuid'), 
        allowNull: false,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users', 
          key: 'user_id',
        },
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE',
      },
      device_type: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      pushed_notification: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
    await queryInterface.dropTable('app');
  },
};
