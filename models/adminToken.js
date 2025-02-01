import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const AdminToken = sequelize.define(
  "AdminToken",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_admin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "admin",
        key: "id",
      },
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    expired_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "admin_token",
    timestamps: false,
  }
);

export default AdminToken;
