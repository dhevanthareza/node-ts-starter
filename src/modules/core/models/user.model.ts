import { Column, Model, Table, Unique } from 'sequelize-typescript'

@Table({
  tableName: 'Users',
})
class User extends Model {
  @Unique
  @Column
  public username: string

  @Column
  public fullname: string

  @Column
  public password: string
}

const UserRoles = {
  ADMIN: 100,
  USER: 1,
}

export default User

