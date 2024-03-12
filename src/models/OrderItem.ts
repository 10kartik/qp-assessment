import { DataTypes } from "sequelize";
import { sequelize } from "../dbConnection.js";
import Order from "./Order.js";
import Grocery from "./Grocery.js";

const OrderItem = sequelize.define(
  "OrderItem",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Order,
        key: "id",
      },
    },
    grocery_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Grocery,
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default OrderItem;
