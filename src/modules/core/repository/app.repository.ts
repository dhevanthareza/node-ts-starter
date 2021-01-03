import moment from 'moment';
import { FindAndCountOptions, FindOptions, Op } from 'sequelize';
import { SequelizeOptions } from 'sequelize-typescript/dist/sequelize/sequelize/sequelize-options';
import User from '../../management/user/user.model';
import { DataTableOptions } from '../typing/datatableOptions.type';
interface RepositoryOptions {
  model: any;
  canSearchField?: Array<string>
  datatableOptions?: FindAndCountOptions
  getAllOptions?: FindOptions
  getOptions?: FindOptions
}
class AppRepository {
  static options: RepositoryOptions;
  public static get Options(): RepositoryOptions {
    return (this as any).options;
  }
  public static get Model(): any {
    return (this as any).options.model;
  }

  public static async get(id: string) {
    return this.Model.findOne({ where: { id }, ...this.Options.getOptions });
  }
  public static async datatable(
    datatableOptions: DataTableOptions = { limit: '5', page: '1', search: '' },
  ) {
    const offset = parseInt(datatableOptions.limit, 10) * (parseInt(datatableOptions.page, 10) - 1);
    const limit = parseInt(datatableOptions.limit, 10);
    let where = {};
    if (this.Options.canSearchField.length > 0) {
      where = {
        ...where,
        [Op.or]: this.Options.canSearchField.map((el: string) => {
          return {
            [el]: {
              [Op.like]: `%${datatableOptions.search}%`,
            },
          };
        }),
      };
    }
    const data = await this.Model.findAndCountAll({
      offset,
      limit,
      where,
      ...this.Options.datatableOptions
    });
    return data;
  }
  public static async getAll(options?: SequelizeOptions) {
    const data = await this.Model.findAll({...this.Options.getAllOptions});
    return data;
  }
  public static async create(user: User, payload: Map<any, any>) {
    return this.Model.create({
      ...payload,
      createdBy: user.id,
      updatedBy: user.id,
    });
  }
  public static async update(user: User, id: string, payload: Map<any, any>) {
    return this.Model.update(
      {
        ...payload,
        updatedBy: user.id,
      },
      {
        where: { id },
      },
    );
  }
  public static async delete(user: User, id: string) {
    return this.Model.update({ deletedAt: moment().format('YYYY/MM/DD'), deletedBy: user.id }, { where: { id } });
  }
}

export { AppRepository, RepositoryOptions };

