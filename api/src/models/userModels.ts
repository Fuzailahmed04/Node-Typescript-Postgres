import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database/database";

interface UserAttributes {
  id: number;
  username: string;
  password: string;
  email?: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public username!: string;
  public password!: string;
  public email?: string;

  // Timestamps are automatically added by Sequelize if enabled
  // public readonly createdAt!: Date;
  // public readonly updatedAt!: Date;
}

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
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: "users",

    timestamps: false,
  }
);

export default User;
