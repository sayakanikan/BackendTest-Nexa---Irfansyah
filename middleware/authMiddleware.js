import jwt from "jsonwebtoken";
import AdminToken from "../models/adminToken.js";
import { errorResponse } from "../utils/baseResponse.js";
const jwtSecret = process.env.JWT_SECRET;

export default async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return errorResponse(res, "Unauthorized", 401, "No token provided");
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, jwtSecret);

    const validToken = await AdminToken.findOne({ where: { token } });
    if (!validToken) return errorResponse(res, "Unauthorized", 401, "Invalid token provided");

    req.adminId = decoded.id;
    next();
  } catch (err) {
    return errorResponse(res, "Error Authorization", 401, err.message);
  }
};
