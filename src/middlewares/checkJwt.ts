import {NextFunction, Request, Response} from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = <string>req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: { 'message': 'No token provided' } });
  }

  const parts = authHeader.split(' ');

  if (!(parts.length === 2)) {
    return res.status(401).json({ error: { message: 'Token invalid' } });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: { message: 'Token malformatted' } });
  }

  let jwtPayload;

  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload
  } catch (error) {
    return res.status(401).json({ error: { message: 'Not authenticated: ' + error.message } });
  }

  next();
};
