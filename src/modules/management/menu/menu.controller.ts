import { Response, Router } from 'express';
import { AppRequest } from '../../../typings/request';
import { asyncHandler } from '../../core/helpers/asyncHandler';
import { ResponseService } from '../../core/service/response.service';
import ValidateService from '../../core/service/validate.service';
import { MenuRepository } from './menu.repository';
import { MenuCreateValidation } from './menu.validation';

const MenuController = Router();
MenuController.get(
  '/',
  asyncHandler(async (req: any, res: Response) => {
    const Menu = await MenuRepository.getAll();
    return ResponseService.success(res, Menu, 'Berhasil mengambil daftar menu', 'SUCCESS')
  }),
);
MenuController.get(
  '/datatable',
  asyncHandler(async (req: AppRequest, res: Response) => {
    const Menu = await MenuRepository.datatable(req.query.search);
    return ResponseService.success(res, Menu, 'Berhasil mengambil daftar menu', 'SUCCESS')
  }),
);
MenuController.get(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const Menu = await MenuRepository.get(req.query.id);
    return ResponseService.success(res, Menu, 'Berhasil mengambil menu', 'SUCCESS')
  }),
);
MenuController.post(
  '/',
  asyncHandler(async (req: any, res: Response) => {
    req.Menu = {id: 1}
    await ValidateService(req, MenuCreateValidation);
    const Menu = await MenuRepository.create(req.user, req.body);
    return ResponseService.success(res, Menu, 'Berhasil membuat menu', 'SUCCESS')
  }),
);
MenuController.put(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const Menu = await MenuRepository.update(req.user, req.params.id, req.body);
    return ResponseService.success(res, Menu, 'Berhasil update menu', 'SUCCESS')
  }),
);
MenuController.delete(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const Menu = await MenuRepository.delete(req.user, req.query.id);
    return ResponseService.success(res, Menu, 'Berhasil menghapus menu', 'SUCCESS')
  }),
);

export default MenuController;
