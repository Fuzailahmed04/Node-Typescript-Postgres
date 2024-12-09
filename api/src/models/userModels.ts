import { DataTypes, Model, Optional } from 'sequelize';
import {sequelize} from '../config/config'; // Replace with your Sequelize instance

// Define the attributes for the User model
interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Optional fields for model creation
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Extend Sequelize's Model class
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Define the model
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Username is required',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Must be a valid email address',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 50],
          msg: 'Password must be between 6 and 50 characters',
        },
      },
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

export default User;
