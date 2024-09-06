"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const debug_1 = __importDefault(require("debug"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env.local file
if (process.env.NODE_ENV === 'development') {
    dotenv_1.default.config({ path: ".env.local" });
}
const debugLogger = (0, debug_1.default)("expressjs-postgresql:server");
function normalizePort(val) {
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
const start = () => __awaiter(void 0, void 0, void 0, function* () {
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
    app_1.app.set("port", port);
    /**
     * Normalize a port into a number, string, or false.
     */
    app_1.app.listen(port, () => {
        console.log(`ExpressJS server listening on port: ${port} !!!!!!!!`);
    });
});
start();
//# sourceMappingURL=index.js.map