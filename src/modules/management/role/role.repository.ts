import moment from 'moment';
import User from '../user/user.model';
import Role from './Role.model';

export class RoleRepository {
  public static async get(id: string): Promise<Role> {
    const data = await Role.findByPk(id);
    return data;
  }
  public static async getAll(): Promise<Role[]> {
    const data = await Role.findAll();
    return data;
  }
  public static async datatable(search: string): Promise<Role[]> {
    const data = await Role.findAll({
      where: {
        Rolename: search,
      },
    });
    return data;
  }
  public static async create(User: User, payload: Role) {
    const data = await Role.create({
      ...payload,
      createdBy: User.id,
      updatedBy: User.id,
    });
    return data;
  }
  public static async update(user: User, id: string, data: Role): Promise<Role> {
    await Role.update(
      {
        ...data,
        updatedBy: user.id,
      },
      { where: { id } },
    );
    const updatedRole = await Role.findByPk(id);
    return updatedRole;
  }
  public static async delete(Role: Role, id: string): Promise<string> {
    await Role.update(
      {
        deletedBy: Role.id,
        deletedAt: moment().format(),
      },
      { where: { id } },
    );
    return 'Role Deleted Successfully';
  }
}
