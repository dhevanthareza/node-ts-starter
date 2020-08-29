import moment from 'moment';
import { Op } from 'sequelize';
import modelName from './moduleName.model';

export class repositoryNameRepository {
  public static async get(id: string): Promise<modelName> {
    const data = await modelName.findByPk(id);
    return data;
  }
  public static async getAll(): Promise<modelName[]> {
    const data = await modelName.findAll();
    return data;
  }
  public static async datatable(
    search: string = '',
    limit: string = '5',
    page: string = '1',
  ) {
    const data = await modelName.findAndCountAll({
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
  public static async create(user: User, payload: modelName, options: any = {}) {
    const data = await modelName.create({
      ...payload,
      createdBy: user.id,
      updatedBy: user.id,
    }, {...options});
    return data;
  }
  public static async update(user: User, id: string, data: modelName): Promise<modelName> {
    await modelName.update(
      {
        ...data,
        updatedBy: user.id,
      },
      { where: { id } },
    );
    const updatedmodelName = await modelName.findByPk(id);
    return updatedmodelName;
  }
  public static async delete(user: User, id: string): Promise<string> {
    await modelName.update(
      {
        deletedBy: user.id,
        deletedAt: moment().format(),
      },
      { where: { id } },
    );
    return 'titleName Deleted Successfully';
  }
}