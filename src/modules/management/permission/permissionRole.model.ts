import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import Role from '../role/role.model';
import User from './../user/user.model';
import Permission from './permission.model';

@Table({
  tableName: 'PermissionRole',
  timestamps: true,
  paranoid: true,
})
class PermissionRole extends Model<PermissionRole> {
  @ForeignKey(() => Permission)
  @Column
  public PermissionId: number

  @ForeignKey(() => Role)
  @Column
  public RoleId: number

  @ForeignKey(() => User)
  @Column
  public createdBy: number;

  @BelongsTo(() => User, 'createdBy')
  public userCreate: User;

  @ForeignKey(() => User)
  @Column
  public updatedBy: number;

  @BelongsTo(() => User, 'updatedBy')
  public userUpdate: User;

  @ForeignKey(() => User)
  @Column
  public deletedBy: number;

  @BelongsTo(() => User, 'deletedBy')
  public userDelete: User;
}

export default PermissionRole;

