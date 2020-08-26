import { Router } from 'express';
import MenuController from './menu/menu.controller';
import UserController from './user/user.controller';

const ManagementRouter = Router();
ManagementRouter.use('/user', UserController)
ManagementRouter.use('/menu', MenuController)

export default ManagementRouter