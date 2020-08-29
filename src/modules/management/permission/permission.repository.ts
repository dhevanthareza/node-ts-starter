import moment from 'moment';
import { Op } from 'sequelize';
import Menu from '../menu/menu.model';
import User from '../user/user.model';
import Permission from './permission.model';

export class PermissionRepository {
  public static async get(id: string): Promise<Permission> {
    const data = await Permission.findByPk(id);
    return data;
  }
  public static async getAll(): Promise<Permission[]> {
    const data = await Permission.findAll();
    return data;
  }
  public static async datatable(
    search: string = '',
    limit: string = '5',
    page: string = '1',
  ) {
    const data = await Permission.findAndCountAll({
      offset: parseInt(limit, 10) * (parseInt(page, 10) - 1),
      limit: parseInt(limit, 10),
      include: [{model: Menu}],
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
  public static async create(User: User, payload: Permission) {
    const data = await Permission.create({
      ...payload,
      createdBy: User.id,
      updatedBy: User.id,
    });
    return data;
  }
  public static async update(user: User, id: string, data: Permission): Promise<Permission> {
    await Permission.update(
      {
        ...data,
        updatedBy: user.id,
      },
      { where: { id } },
    );
    const updatedPermission = await Permission.findByPk(id);
    return updatedPermission;
  }
  public static async delete(Permission: Permission, id: string): Promise<string> {
    await Permission.update(
      {
        deletedBy: Permission.id,
        deletedAt: moment().format(),
      },
      { where: { id } },
    );
    return 'Permission Deleted Successfully';
  }
}
