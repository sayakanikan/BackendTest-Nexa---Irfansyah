import Admin from "./admin.js";
import AdminToken, { belongsTo } from "./admin_token.js";
import Karyawan from "./karyawan.js";

Admin.hasMany(AdminToken, { foreignKey: "id_admin", sourceKey: "id" });
belongsTo(Admin, { foreignKey: "id_admin", targetKey: "id" });

export default {
  Admin,
  AdminToken,
  Karyawan,
};
