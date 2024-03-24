import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, HasMany, HasOne } from 'sequelize-typescript';
import { SiftStaff } from './siftStaff';

@Table({
  timestamps:false

})
export class myStaff extends Model{
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  name!: string;

  @HasMany(()=> SiftStaff)
  sift!: SiftStaff[];

  
 
}
