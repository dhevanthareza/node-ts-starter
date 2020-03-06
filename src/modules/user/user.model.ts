import bcrypt from 'bcrypt-nodejs'
import { Column, Model, Table, Unique } from 'sequelize-typescript'

@Table({
  tableName: 'User',
})
class User extends Model {
  @Unique
  @Column
  public username: string

  @Column
  public email: string

  @Column
  get password(): string {
    return null
  }
  set password(password: string) {
    this.setDataValue('password', bcrypt.hashSync(password))
  }

  @Column
  public firstName: string

  @Column
  public lastName: string

  @Column
  public address: string

  @Column
  public biography: string

  @Column
  public photo: string

  @Column
  public roleId: number
}

export default User

