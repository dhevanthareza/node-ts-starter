import moment from 'moment';
import User from '../user/user.model';
import Permission from './Permission.model';

export class PermissionRepository {
  public static async get(id: string): Promise<Permission> {
    const data = await Permission.findByPk(id);
    return data;
  }
  public static async getAll(): Promise<Permission[]> {
    const data = await Permission.findAll();
    return data;
  }
  public static async datatable(search: string): Promise<Permission[]> {
    const data = await Permission.findAll({
      where: {
        Permissionname: search,
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
