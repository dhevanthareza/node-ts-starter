import moment from 'moment';
import { Op } from 'sequelize';
import User from '../../management/user/user.model';
import MasterBarang from './barang.model';

export class MasterBarangRepository {
  public static async get(id: string): Promise<MasterBarang> {
    const data = await MasterBarang.findByPk(id);
    return data;
  }
  public static async getAll(): Promise<MasterBarang[]> {
    const data = await MasterBarang.findAll();
    return data;
  }
  public static async datatable(
    search: string = '',
    limit: string = '5',
    page: string = '1',
  ) {
    const data = await MasterBarang.findAndCountAll({
      offset: parseInt(limit, 10) * (parseInt(page, 10) - 1),
      limit: parseInt(limit, 10),
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      },
    });
    return data;
  }
  public static async create(user: User, payload: MasterBarang, options: any = {}) {
    const data = await MasterBarang.create({
      ...payload,
      createdBy: user.id,
      updatedBy: user.id,
    }, {...options});
    return data;
  }
  public static async update(user: User, id: string, data: MasterBarang): Promise<MasterBarang> {
    await MasterBarang.update(
      {
        ...data,
        updatedBy: user.id,
      },
      { where: { id } },
    );
    const updatedMasterBarang = await MasterBarang.findByPk(id);
    return updatedMasterBarang;
  }
  public static async delete(user: User, id: string): Promise<string> {
    await MasterBarang.update(
      {
        deletedBy: user.id,
        deletedAt: moment().format(),
      },
      { where: { id } },
    );
    return 'Data barang Deleted Successfully';
  }
}