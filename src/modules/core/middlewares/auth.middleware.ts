import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import ApplicationError from '../helpers/errorHandler';
import * as config from './../../../config.json';
import { AppRequest } from './../../../typings/request.d';
import AuthInstance from './../helpers/authInstance';

const isAuthenticated = (req: AppRequest, res: Response, next: NextFunction) => {
  let token = req.headers.authorization;
  if (token) {
    token = token.slice(7, token.length);
    jwt.verify(token, (config as any)[process.env.NODE_ENV].jwt_secret, (error: any, decoded: any) => {
      if (error || decoded === null) {
        throw new ApplicationError({ message: 'Token Not Valid', 'code': 401 })
      } else {
        delete decoded.iat
        AuthInstance.setUser(decoded)
        req.user = decoded;
        next();
      }
    })
  } else {
    throw new ApplicationError({ message: 'No Token', code: 401 })
  }
}
export default isAuthenticated