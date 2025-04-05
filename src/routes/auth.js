import Router from "koa-router";
import User from '../models/User.js';
import { hashPassword } from "../utils/password.js";

const router = new Router();

// Register
router.post("/register", async (ctx) => {
  let today = new Date();
  const { username, email, password } = ctx.request.body;
  const existing = await User.findOne({ email });
  if (existing) {
    ctx.throw(400, "User already exists");
  }

  const { hash, salt } = hashPassword(password);
  const user = new User({ username, email, hash, salt });
  await user.save();

  ctx.body = { message: "User registered" };
});

export default router;
