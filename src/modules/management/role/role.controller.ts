import { Response, Router } from 'express';
import { AppRequest } from '../../../typings/request';
import { asyncHandler } from '../../core/helpers/asyncHandler';
import { ResponseService } from '../../core/service/response.service';
import ValidateService from '../../core/service/validate.service';
import { RoleRepository } from './Role.repository';
import { RoleCreateValidation } from './role.validation';

const RoleController = Router();
RoleController.get(
  '/',
  asyncHandler(async (req: any, res: Response) => {
    const Role = await RoleRepository.getAll();
    return ResponseService.success(res, Role, 'Berhasil mengambil daftar Role', 'SUCCESS')
  }),
);
RoleController.get(
  '/datatable',
  asyncHandler(async (req: AppRequest, res: Response) => {
    const Role = await RoleRepository.datatable(req.query.search);
    return ResponseService.success(res, Role, 'Berhasil mengambil daftar Role', 'SUCCESS')
  }),
);
RoleController.get(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const Role = await RoleRepository.get(req.query.id);
    return ResponseService.success(res, Role, 'Berhasil mengambil Role', 'SUCCESS')
  }),
);
RoleController.post(
  '/',
  asyncHandler(async (req: any, res: Response) => {
    req.Role = {id: 1}
    await ValidateService(req, RoleCreateValidation);
    const Role = await RoleRepository.create(req.user, req.body);
    return ResponseService.success(res, Role, 'Berhasil membuat Role', 'SUCCESS')
  }),
);
RoleController.put(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const Role = await RoleRepository.update(req.user, req.params.id, req.body);
    return ResponseService.success(res, Role, 'Berhasil update Role', 'SUCCESS')
  }),
);
RoleController.delete(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const Role = await RoleRepository.delete(req.user, req.query.id);
    return ResponseService.success(res, Role, 'Berhasil menghapus Role', 'SUCCESS')
  }),
);

export default RoleController;
