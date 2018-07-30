import express from 'express';
// import cors from 'cors';
import path from 'path';
import indexRoute from './api/index';
import userRoute from './api/user/user.route';
import dogRoute from './api/dog/dog.route';
import addMiddleware from './middleware';
import connect from './db';

const app = express();

// local vars
app.locals.title = 'express server';

// alllow access to api
// app.use(cors())

// add addMiddleware
addMiddleware(app);

// connect to database
connect();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json',
  );
  next();
});

// parse json payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set public folder
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', indexRoute);
app.use('/user', userRoute);
app.use('/dog', dogRoute);
app.use('*', indexRoute); // catch all

// global error handler
app.use((err, req, res /* , next */) => {
  // console.log(err.stack);
  res.status(500).send(`error: ${err.message}`);
});

export default app;
