//to run - nodemon app.js

//import stuff
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import Router from '@koa/router';
import dotenv from 'dotenv';
import connectToDB from "./db.js";
import authRoutes from "./src/routes/auth.js";

//allow environment variables
dotenv.config();

//create the app and initialize the router
const app = new Koa();
const router = new Router();

//Use CORS
app.use(cors({
  allowMethods: ['GET', 'POST'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

//need this to parse request bodies
app.use(bodyParser());
app.use(authRoutes.routes()).use(authRoutes.allowedMethods());

//PORT .env variable
const PORT = process.env.PORT || 3000;

connectToDB().then(() => {
  app.listen(3000, () => {
    console.log("🚀 Server running at http://localhost:3000");
  });
});