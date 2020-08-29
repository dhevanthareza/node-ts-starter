import bcrypt from 'bcrypt'
import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import Role from './../role/role.model'
@Table({
  tableName: 'User',
  timestamps: true,
  paranoid: true,
})
class User extends Model<User> {
  @Column
  public phone: string

  @Column
  public email: string

  @Column
  public fullname: string

  @Column
  get password(): string {
    return this.getDataValue('password')
  }
  set password(password: string) {
    this.setDataValue('password', bcrypt.hashSync(password, 10))
  }

  @ForeignKey(() => Role)
  @Column
  public RoleId: number;

  @BelongsTo(() => Role)
  public Role: User;
}

export default User

