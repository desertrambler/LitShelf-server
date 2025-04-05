import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-dev-secret";
const EXPIRES_IN = "7d";

export function generateJWT(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN });
}

export function verifyJWT(token) {
  return jwt.verify(token, JWT_SECRET);
}