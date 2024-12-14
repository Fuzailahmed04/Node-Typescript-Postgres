import { Model, DataTypes } from 'sequelize';
import sequelizeInit from '../config/sequelize-cli';
import { v4 as uuidv4 } from 'uuid'; 

class User extends Model {
  public user_id!: string; 
  public username!: string;
  public email!: string;
  public password!: string;
  public push_notification_token?: string; 
  public device_type?: 'iOS' | 'Android' | 'Web'; 

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  id: any;
}

User.init(
  {
    user_id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    push_notification_token: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
    device_type: {
      type: DataTypes.ENUM('iOS', 'Android', 'Web'), 
      allowNull: true, 
    },
  },
  {
    sequelize: sequelizeInit,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    underscored: true,
  }
);

export default User;
