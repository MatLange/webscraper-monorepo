import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import cors from 'cors';  
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser'; 
import logger from 'morgan';
import { errorHandler } from './middleware/errorHandler';
import { NotFoundError } from './errors/notFoundError';
import { indexRouter } from './routes/index';
import { usersRouter } from './routes/users';

const app = express();
// Use the CORS middleware
const corsOptions = {
  origin: 'http://localhost:5173', // Allow only this origin
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));


app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
  })
);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };