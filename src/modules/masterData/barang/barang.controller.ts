import { Response, Router } from 'express';
import { AppRequest } from '../../../typings/request';
import { asyncHandler } from '../../core/helpers/asyncHandler';
import { ResponseService } from '../../core/service/response.service';
import ValidateService from '../../core/service/validate.service';
import { MasterBarangRepository } from './barang.repository';
import { barangCreateValidation } from './barang.validation';

const MasterBarangController = Router();
MasterBarangController.get(
  '/',
  asyncHandler(async (req: any, res: Response) => {
    const barang = await MasterBarangRepository.getAll();
    return ResponseService.success(res, barang, 'Berhasil mengambil daftar Data barang', 'SUCCESS');
  }),
);
MasterBarangController.get(
  '/datatable',
  asyncHandler(async (req: AppRequest, res: Response) => {
    const barang = await MasterBarangRepository.datatable(req.query.search);
    return ResponseService.success(res, barang, 'Berhasil mengambil daftar Data barang', 'SUCCESS');
  }),
);
MasterBarangController.get(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const barang = await MasterBarangRepository.get(req.params.id);
    return ResponseService.success(res, barang, 'Berhasil mengambil Data barang', 'SUCCESS');
  }),
);
MasterBarangController.post(
  '/',
  asyncHandler(async (req: any, res: Response) => {
    await ValidateService(req, barangCreateValidation);
    const barang = await MasterBarangRepository.create(req.user, req.body);
    return ResponseService.success(res, barang, 'Berhasil membuat Data barang', 'SUCCESS');
  }),
);
MasterBarangController.put(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const barang = await MasterBarangRepository.update(req.user, req.params.id, req.body);
    return ResponseService.success(res, barang, 'Berhasil update Data barang', 'SUCCESS');
  }),
);
MasterBarangController.delete(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const barang = await MasterBarangRepository.delete(req.user, req.params.id);
    return ResponseService.success(res, barang, 'Berhasil menghapus Data barang', 'SUCCESS');
  }),
);

export default MasterBarangController;
