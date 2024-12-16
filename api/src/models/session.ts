import { Model, DataTypes } from 'sequelize';
import sequelizeInit from '../config/sequelize-cli';
import User from './user';
import { v4 as uuidv4 } from 'uuid';


export class UserSession extends Model {

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
    sequelize: sequelizeInit,
    modelName: 'UserSession',
    tableName: 'user_sessions',
    timestamps: true,
    underscored: true,
  }
);

UserSession.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(UserSession, { foreignKey: 'user_id', as: 'sessions' });

export default UserSession;
