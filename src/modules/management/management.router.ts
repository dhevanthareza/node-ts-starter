import { Router } from 'express';
import MenuController from './menu/menu.controller';
import PermissionController from './permission/permission.controller';
import RoleController from './role/role.controller';
import UserController from './user/user.controller';

const ManagementRouter = Router();
ManagementRouter.use('/user', UserController)
ManagementRouter.use('/role', RoleController)
ManagementRouter.use('/menu', MenuController)
ManagementRouter.use('/permission', PermissionController)

export default ManagementRouter