import jwt from "jsonwebtoken";
import User from ''

const JWT_SECRET = process.env.JWT_SECRET || "your-dev-secret";

export async function requireAuth(ctx, next) {
  const authHeader = ctx.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    ctx.throw(401, "Missing or invalid Authorization header");
  }

  const token = authHeader.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    ctx.state.user = payload;
    await next();
  } catch (err) {
    ctx.throw(401, "Invalid or expired token");
  }
}
