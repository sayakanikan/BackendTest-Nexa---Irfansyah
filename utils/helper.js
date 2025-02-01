import jwt from "jsonwebtoken";
import moment from "moment-timezone";
import 'dotenv/config';

const jwtSecret = process.env.JWT_SECRET;

export function getJwtUsername(req) {
  const token = req.headers.authorization?.split(" ")[1];
  const decoded = jwt.verify(token, jwtSecret);
  return decoded.username;
}

export function getTimestamp() {
  return moment().tz("Asia/Jakarta").format()
}