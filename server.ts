//to run - nodemon app.js

//import stuff
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import Router from '@koa/router';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'

//import routes
//import bookRoutes from "./src/routes/bookRoutes";

//allow environment variables
dotenv.config();

//create the app and initialize the router
const app = new Koa();
const router = new Router();

// Define routes

router.get('/login', async (ctx) => {
  // Access the request
  const { headers, method, url } = ctx.request;

  // You can use these for logging/debugging if needed
  console.log('Request:', method, url);
  console.log('User-Agent:', headers['user-agent']);

  // Send response
  ctx.status = 200;
  ctx.type = 'json';
  ctx.body = 'hello there'
});

//Use CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  allowMethods: ['GET', 'POST'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


//need this to parse request bodies
//app.use(bodyParser());
//app.use(bookRoutes.routes()).use(bookRoutes.allowedMethods());
app.use(router.routes()).use(router.allowedMethods());

//ENV variables
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
