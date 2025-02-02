import jwt from "jsonwebtoken";
import md5 from "md5";
import Admin from "../models/admin.js";
import AdminToken from "../models/adminToken.js";
import "dotenv/config.js";
import { successResponse, errorResponse } from "../utils/baseResponse.js";

const jwtSecret = process.env.JWT_SECRET;
const tokenExpiry = 3600; // 1 jam

export async function getToken(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return errorResponse(res, "Validation Error", 400, "Username and password are required");
  }

  try {
    const admin = await Admin.findOne({ where: { username } });
    if (!admin) return errorResponse(res, "Not Found", 404, "User Not Found");

    const encryptedPassword = md5(password);
    if (encryptedPassword != admin.password) return errorResponse(res, "Invalid Credentials", 401, "Wrong Username or Password");

    const payload = { id: admin.id, username: admin.username };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: tokenExpiry });

    const expired_at = new Date(Date.now() + tokenExpiry * 1000);
    expired_at.setHours(expired_at.getHours() + 7);

    await AdminToken.create({ id_admin: admin.id, token, expired_at });

    const data = {
      id: admin.id,
      username: admin.username,
      token,
      expired_at,
    };
    return successResponse(res, data, "Successfully get token");
  } catch (err) {
    return errorResponse(res, "Internal server error", 500, err.message);
  }
}
