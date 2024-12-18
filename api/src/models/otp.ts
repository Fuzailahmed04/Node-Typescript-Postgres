// import { Model, DataTypes } from 'sequelize';
// import sequelizeInit from '../config/sequelize';
// import User from './user';
// import { v4 as uuidv4 } from 'uuid';

// export class UserSession extends Model {
//   declare id: string;
//   declare user_id: number;
//   declare token: string;
// }

// UserSession.init(
//   {
//     id: {
//       type: DataTypes.UUID,
//       defaultValue: uuidv4,
//       primaryKey: true,
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       references: {
//         model: 'users',
//         key: 'email',
//       },
//       onUpdate: 'CASCADE',
//       onDelete: 'CASCADE',
//     },
//     otp: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
//   {
//     sequelize: sequelizeInit,
//     modelName: 'otp',
//     tableName: 'otp',
//     timestamps: true,
//     underscored: true,
//   }
// );

// UserSession.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
// User.hasMany(UserSession, { foreignKey: 'user_id', as: 'sessions' });

// export default UserSession;