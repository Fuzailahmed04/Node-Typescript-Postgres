'use strict';

import { Model, DataTypes } from 'sequelize';
// import { sequelize } from '../src/config/config';
import User from '../models/user';
import { v4 as uuidv4 } from 'uuid';
import sequelizeInit from "../config/sequelize-cli"

class App extends Model {
    declare id: string;
    declare user_id: number;
    declare device_type: string;
    declare pushed_notification: string;

}
App.init(
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
        device_type: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        pushed_notification: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: false,
        },

        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize: sequelizeInit,
        modelName: 'App',
        tableName: 'app',
        underscored: true,
        timestamps: true,
    }
);
App.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(App, { foreignKey: 'user_id', as: 'sessions' });
export default App;

