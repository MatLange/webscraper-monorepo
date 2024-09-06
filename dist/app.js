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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const body_parser_1 = require("body-parser");
const cookie_session_1 = __importDefault(require("cookie-session"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const errorHandler_1 = require("./middleware/errorHandler");
const notFoundError_1 = require("./errors/notFoundError");
const index_1 = require("./routes/index");
const users_1 = require("./routes/users");
// Load environment variables from .env.local file
if (process.env.NODE_ENV !== 'production') {
    dotenv_1.default.config({ path: ".env.local" });
}
const app = (0, express_1.default)();
exports.app = app;
// Use the CORS middleware
const corsOptions = {
    origin: 'http://localhost:5173', // Allow only this origin
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};
app.use((0, cors_1.default)(corsOptions));
app.set('trust proxy', true);
app.use((0, body_parser_1.json)());
app.use((0, cookie_session_1.default)({
    signed: false,
    secure: process.env.NODE_ENV !== 'development'
}));
// view engine setup
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/', index_1.indexRouter);
app.use('/users', users_1.usersRouter);
app.all('*', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    throw new notFoundError_1.NotFoundError();
}));
app.use(errorHandler_1.errorHandler);
//# sourceMappingURL=app.js.map