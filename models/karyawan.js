import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Karyawan = sequelize.define(
  "Karyawan",
  {
    nip: {
      type: DataTypes.STRING(50),
      primaryKey: true,
      allowNull: false,
    },
    nama: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    alamat: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    gend: {
      type: DataTypes.ENUM("L", "P"),
      allowNull: false,
    },
    photo: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    tgl_lahir: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    insert_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: true,
    },
    insert_by: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    update_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    update_by: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  },
  {
    tableName: "karyawan",
    timestamps: false,
  }
);

export default Karyawan;
