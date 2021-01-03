import AppController from '../../core/controller/app.controller';
import { MasterBarangRepository } from './barang.repository';

class MasterBarangController extends AppController {
  constructor() {
    super({repository: MasterBarangRepository});
  }
  // TODO: create some function if needed or if you want override it, below is example
  // async get(req: any, res: any) {
  //   const data = 'overide';
  //   res.json(data);
  // }
}
export default MasterBarangController;
