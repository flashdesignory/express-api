import express from 'express';
import path from 'path';
import indexRoute from './api/index';
import userRoute from './api/user/user.route';
import dogRoute from './api/dog/dog.route';

const app = express();

//local vars
app.locals.title = 'express server';

//parse json payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set public folder
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/', indexRoute);
app.use('/user', userRoute);
app.use('/dog', dogRoute);

//global error handler
app.use((err, req, res, next) => {
//console.log(err.stack);
	res.status(500).send(`error: ${err.message}`);
});

export default app;
