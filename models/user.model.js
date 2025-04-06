import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const User = sequelize.define('User', {
  User_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  first_name: { type: DataTypes.STRING, allowNull: false },
  last_name: { type: DataTypes.STRING, allowNull: false },
  date_of_birth: { type: DataTypes.DATE, allowNull: false },
  contact: { type: DataTypes.BIGINT, allowNull: false, defaultValue: 9999999999 },
  alternate_contact: { type: DataTypes.BIGINT, allowNull: false, defaultValue: 9999999999 },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: false },
  pincode: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 999999 },
  state: { type: DataTypes.STRING, allowNull: false, defaultValue: "Unknown" },
  refresh_token: { type: DataTypes.TEXT, allowNull: true },

});
