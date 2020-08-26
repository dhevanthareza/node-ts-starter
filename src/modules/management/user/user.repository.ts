import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import { Op } from 'sequelize';
import ErrorHandler from '../../core/helpers/errorHandler';
import * as config from './../../../config.json';
import User from './user.model';

export class UserRepository {
  public static async get(id: string): Promise<User> {
    const data = await User.findByPk(id);
    return data;
  }
  public static async getAll(): Promise<User[]> {
    const data = await User.findAll();
    return data;
  }
  public static async datatable(search: string): Promise<User[]> {
    const data = await User.findAll({
      where: {
        username: search,
      },
      attributes: ['id', 'username', 'email', 'firstname', 'lastname', 'roleId'],
    });
    return data;
  }
  public static async create(user: User, payload: User) {
    const data = await User.create({
      ...payload,
      createdBy: user.id,
      updatedBy: user.id,
    });
    return data;
  }
  public static async update(user: User, id: string, data: User): Promise<User> {
    await User.update(
      {
        ...data,
        updatedBy: user.id,
      },
      { where: { id } },
    );
    const updatedUser = await User.findByPk(id);
    return updatedUser;
  }
  public static async delete(user: User, id: string): Promise<string> {
    await User.update(
      {
        deletedBy: user.id,
        deletedAt: moment().format(),
      },
      { where: { id } },
    );
    return 'User Deleted Successfully';
  }
  public static async generateAuthToken(user: User) {
    const token = await jwt.sign(user.toJSON(), (config as any)[process.env.NODE_ENV].jwt_secret);
    return token;
  }
  public static async findByCredentials(username: string, password: string): Promise<User> {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: username }, { phone: username }],
      },
    });
    if (!user) {
      throw new ErrorHandler({ message: 'User tidak ditemukan' });
    }
    const isPasswordMatch = bcrypt.compareSync(password, user.password);
    if (!isPasswordMatch) {
      throw new ErrorHandler({ message: 'Password Salah' });
    }
    return user;
  }
}
