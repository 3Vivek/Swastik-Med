// models/purchase.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { User } from "./user.model.js";

export const Cart = sequelize.define("Cart", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User, 
      key: "User_id",
    },
  },
  testIds: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  testNames: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  testPrices: {
    type: DataTypes.JSON, 
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
});
