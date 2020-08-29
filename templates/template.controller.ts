import { Response, Router } from 'express';
import { repositoryNameRepository } from './moduleName.repository';
import { moduleNameCreateValidation } from './moduleName.validation';

const controllerNameController = Router();
controllerNameController.get(
  '/',
  asyncHandler(async (req: any, res: Response) => {
    const moduleName = await repositoryNameRepository.getAll();
    return ResponseService.success(res, moduleName, 'Berhasil mengambil daftar titleName', 'SUCCESS');
  }),
);
controllerNameController.get(
  '/datatable',
  asyncHandler(async (req: AppRequest, res: Response) => {
    const moduleName = await repositoryNameRepository.datatable(req.query.search);
    return ResponseService.success(res, moduleName, 'Berhasil mengambil daftar titleName', 'SUCCESS');
  }),
);
controllerNameController.get(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const moduleName = await repositoryNameRepository.get(req.params.id);
    return ResponseService.success(res, moduleName, 'Berhasil mengambil titleName', 'SUCCESS');
  }),
);
controllerNameController.post(
  '/',
  asyncHandler(async (req: any, res: Response) => {
    await ValidateService(req, moduleNameCreateValidation);
    const moduleName = await repositoryNameRepository.create(req.user, req.body);
    return ResponseService.success(res, moduleName, 'Berhasil membuat titleName', 'SUCCESS');
  }),
);
controllerNameController.put(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const moduleName = await repositoryNameRepository.update(req.user, req.params.id, req.body);
    return ResponseService.success(res, moduleName, 'Berhasil update titleName', 'SUCCESS');
  }),
);
controllerNameController.delete(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const moduleName = await repositoryNameRepository.delete(req.user, req.params.id);
    return ResponseService.success(res, moduleName, 'Berhasil menghapus titleName', 'SUCCESS');
  }),
);

export default controllerNameController;
