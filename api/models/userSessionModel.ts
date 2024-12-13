import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../src/config/config';
import User from './User';
import { v4 as uuidv4 } from 'uuid';

// Define the UserSession model without declaring public fields
export class UserSession extends Model {
  // You can use the 'declare' keyword for model attributes without initializing them
  declare id: string;
  declare user_id: number;
  declare token: string;
}

UserSession.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'UserSession',
    tableName: 'user_sessions',
    timestamps: true,
    underscored: true,
  }
);

// Define relationships
UserSession.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(UserSession, { foreignKey: 'user_id', as: 'sessions' });

export default UserSession;
