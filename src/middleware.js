import bodyParser from 'body-parser';

const addMiddleware = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
};

export default addMiddleware;
