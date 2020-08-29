import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import { Op } from 'sequelize';
import ErrorHandler from '../../core/helpers/errorHandler';
import Role from '../role/role.model';
import * as config from './../../../config.json';
import User from './user.model';

export class UserRepository {
  public static async get(id: string): Promise<User> {
    const data = await User.findByPk(id, {
      attributes: {
        exclude: ['password'],
      },
    });
    return data;
  }
  public static async getAll(): Promise<User[]> {
    const data = await User.findAll({
      attributes: {
        exclude: ['password'],
      },
    });
    return data;
  }
  public static async datatable(search: string = '', limit: string = '5', page: string = '1') {
    const data = await User.findAndCountAll({
      attributes: {
        exclude: ['password'],
      },
      include: [{ model: Role }],
      offset: parseInt(limit, 10) * (parseInt(page, 10) - 1),
      limit: parseInt(limit, 10),
      where: {
        [Op.or]: [
          {
            email: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            phone: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            fullname: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            '$Role.name$': {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      },
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
