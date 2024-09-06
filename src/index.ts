import mongoose from "mongoose";

import { app } from "./app";
import debug from "debug";
import http from "http";
import dotenv from "dotenv";

// Load environment variables from .env.local file
if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: ".env.local" });
}

const debugLogger = debug("expressjs-postgresql:server");

function normalizePort(val: string): number | string | false {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  /*   try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');

    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  } */

  /**
   * Get port from environment and store in Express.
   */

  const port = normalizePort(process.env.PORT || "3000");
  app.set("port", 8080);
 
  /**
   * Normalize a port into a number, string, or false.
   */

  app.listen(port, () => {
    console.log(`ExpressJS server listening on port: ${port} !!!!!!!!`);
  });
};
 
start();
