import { Table,Model,Column, ForeignKey, BelongsTo, DataType } from "sequelize-typescript";
import { User } from "./User";


@Table({
  timestamps:false
})
export class Child extends Model{
  @Column({
    type:DataType.STRING
  })
  childname!:string
  
  @Column({
    type:DataType.DATEONLY,
  })
  dateofbirth!:Date

  @ForeignKey(() => User)
  @Column
  userId!:number

  @BelongsTo(() => User)
  user!:User
}