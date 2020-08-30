import { Router } from 'express';
import MasterBarangController from './barang/barang.controller';

const masterDataRouter = Router();
masterDataRouter.use('/barang', MasterBarangController);

export default masterDataRouter