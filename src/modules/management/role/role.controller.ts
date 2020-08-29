import { Response, Router } from 'express';
import moment from 'moment';
import { AppRequest } from '../../../typings/request';
import { asyncHandler } from '../../core/helpers/asyncHandler';
import { ResponseService } from '../../core/service/response.service';
import ValidateService from '../../core/service/validate.service';
import Menu from '../menu/menu.model';
import Permission from '../permission/permission.model';
import Role from './role.model';
import { RoleRepository } from './role.repository';
import { RoleCreateValidation } from './role.validation';
import RolePermission from './rolePermission.model';

const RoleController = Router();
RoleController.get(
  '/',
  asyncHandler(async (req: any, res: Response) => {
    const Role = await RoleRepository.getAll();
    return ResponseService.success(res, Role, 'Berhasil mengambil daftar Role', 'SUCCESS');
  }),
);
RoleController.get(
  '/datatable',
  asyncHandler(async (req: AppRequest, res: Response) => {
    const Role = await RoleRepository.datatable(req.query.search);
    return ResponseService.success(res, Role, 'Berhasil mengambil daftar Role', 'SUCCESS');
  }),
);
RoleController.get(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const Role = await RoleRepository.get(req.params.id);
    return ResponseService.success(res, Role, 'Berhasil mengambil Role', 'SUCCESS');
  }),
);
RoleController.get(
  '/:id/permission',
  asyncHandler(async (req: any, res: Response) => {
    const roleWithPermission = await Role.findByPk(req.params.id, {
      include: [{ model: Permission, include: [{ model: Menu}] }],
    });
    return ResponseService.success(res, roleWithPermission, 'Berhasil mengambil Role', 'SUCCESS');
  }),
);
RoleController.post(
  '/:id/permission',
  asyncHandler(async (req: any, res: Response) => {
    const rolePermission = await RolePermission.create({
      RoleId: req.params.id,
      PermissionId: req.body.PermissionId,
      createdBy: req.user.id,
      updatedBy: req.user.id,
    })
    return ResponseService.success(res, rolePermission, 'Berhasil mengambil Role', 'SUCCESS');
  }),
);
RoleController.delete(
  '/:id/permission/:permissionId',
  asyncHandler(async (req: any, res: Response) => {
    const rolePermission = await RolePermission.update({
      deletedBy: req.user.id,
      deletedAt: moment().format()
    }, {
      where: {
        PermissionId: req.params.permissionId,
        RoleId: req.params.id
      }
    })
    return ResponseService.success(res, rolePermission, 'Berhasil mengambil Role', 'SUCCESS');
  }),
);
RoleController.post(
  '/',
  asyncHandler(async (req: any, res: Response) => {
    await ValidateService(req, RoleCreateValidation);
    const Role = await RoleRepository.create(req.user, req.body);
    return ResponseService.success(res, Role, 'Berhasil membuat Role', 'SUCCESS');
  }),
);
RoleController.put(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const Role = await RoleRepository.update(req.user, req.params.id, req.body);
    return ResponseService.success(res, Role, 'Berhasil update Role', 'SUCCESS');
  }),
);
RoleController.delete(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const Role = await RoleRepository.delete(req.user, req.params.id);
    return ResponseService.success(res, Role, 'Berhasil menghapus Role', 'SUCCESS');
  }),
);

export default RoleController;
