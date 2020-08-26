import moment from 'moment';
import User from '../user/user.model';
import Menu from './menu.model';

export class MenuRepository {
  public static async get(id: string): Promise<Menu> {
    const data = await Menu.findByPk(id);
    return data;
  }
  public static async getAll(): Promise<Menu[]> {
    const data = await Menu.findAll();
    return data;
  }
  public static async datatable(search: string): Promise<Menu[]> {
    const data = await Menu.findAll({
      where: {
        Menuname: search,
      },
    });
    return data;
  }
  public static async create(User: User, payload: Menu) {
    const data = await Menu.create({
      ...payload,
      createdBy: User.id,
      updatedBy: User.id,
    });
    return data;
  }
  public static async update(user: User, id: string, data: Menu): Promise<Menu> {
    await Menu.update(
      {
        ...data,
        updatedBy: user.id,
      },
      { where: { id } },
    );
    const updatedMenu = await Menu.findByPk(id);
    return updatedMenu;
  }
  public static async delete(Menu: Menu, id: string): Promise<string> {
    await Menu.update(
      {
        deletedBy: Menu.id,
        deletedAt: moment().format(),
      },
      { where: { id } },
    );
    return 'Menu Deleted Successfully';
  }
}
