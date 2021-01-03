import { AppRepository, RepositoryOptions } from '../../core/repository/app.repository';
import MasterBarang from './barang.model';

class MasterBarangRepository extends AppRepository {
  static options: RepositoryOptions = {
    model: MasterBarang,
    canSearchField: [],
  };
  // TODO: create some function if needed, below is example
  // public static async get() {
  //   const data = 'overide';
  //   return data
  // }
}

export { MasterBarangRepository };
