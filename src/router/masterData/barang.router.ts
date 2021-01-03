import { Router } from "express";
import MasterBarangController from "../../modules/masterData/barang/barang.controller";

const BarangRouter = Router()
const _MasterBarangController = new MasterBarangController()
BarangRouter.get('/', _MasterBarangController.getAll)
BarangRouter.get('/datatable', _MasterBarangController.datatable)
BarangRouter.get('/:id', _MasterBarangController.get)

BarangRouter.post('/', _MasterBarangController.create)

BarangRouter.put('/:id', _MasterBarangController.update)

BarangRouter.delete('/:id', _MasterBarangController.delete)

export { BarangRouter };

