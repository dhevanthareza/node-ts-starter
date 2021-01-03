import { Router } from 'express';
import AuthController from './controller/auth.controller';

const CoreRouter = Router();
CoreRouter.use('/auth', AuthController)

export default CoreRouter