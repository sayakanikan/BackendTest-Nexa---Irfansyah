import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Admin = sequelize.define(
  "Admin",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.BLOB("tiny"),
      allowNull: false,
      get() {
        const rawValue = this.getDataValue("password");
        return rawValue ? rawValue.toString("hex") : null;
      }
    },
  },
  {
    tableName: "admin",
    timestamps: false,
  }
);

export default Admin;
