import { BelongsTo, Column, ForeignKey, Model, Table, Unique } from 'sequelize-typescript';
import User from '../../management/user/user.model';

@Table({
  tableName: 'MasterBarang',
  timestamps: true,
  paranoid: true,
})
class MasterBarang extends Model<MasterBarang> {
  @Unique
  @Column
  public code: string;

  @Column
  public name: string;

  @Column
  public hargaBeli: number;

  @Column
  public hargaPokok: number;

  @Column
  public hargaJual: number;
  
  @Column
  public qty: number;
  
  @Column
  public image: number;

  // Has Many Example
  // @HasMany(() => Permission)
  // public Permissions: Permission[];

  // Many to many example
  // @BelongsToMany(() => Permission, () => RolePermission)
  // Permission: Permission[];

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

export default MasterBarang;

