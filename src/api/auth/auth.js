import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';

const checkToken = expressJwt({ secret: process.env.JWT_SECRET });

export const signToken = id => jwt.sign({ id }, process.env.JWT_SECRET.toString(), {
  expiresIn: process.env.EXPIRE_TIME.toString(),
});

// export const signToken = id => jwt.sign({ id }, 'BIGFOOT4REAL', { expiresIn: '30d' });

export const decodeToken = () => (req, res, next) => {
  if (process.env.DISABLE_AUTH) {
    return next();
  }

  // eslint-disable-next-line no-prototype-builtins
  if (req.query && req.query.hasOwnProperty('access_token')) {
    req.headers.authorization = `Bearer ${req.query.access_token}`;
  }

  return checkToken(req, res, next);
};

export const signin = (req, res) => {
  // temp id from env
  const token = signToken(process.env.ID.toString());
  res.json({ token });
};

export const verifyUser = () => (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('username and password required');
  }

  // temp
  if (username === process.env.USERNAME && password === process.env.PASSWORD) {
    return next();
  }
  return res.status(401).send('username or password incorrect');
};

export const protect = [decodeToken()];
