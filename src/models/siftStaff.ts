import { Table,Model,Column,PrimaryKey,AutoIncrement, DataType, HasOne, BelongsTo, ForeignKey } from "sequelize-typescript";

import { myStaff } from "./mystaff";

@Table({
  timestamps:false
})
export class SiftStaff extends Model{

 @ForeignKey(()=>myStaff)
 @Column
mystaffid!:number

@Column
day!:string

@Column({
  type:DataType.TIME
})
startTime!:string

@Column({
  type:DataType.TIME
})
endTime!:string


@BelongsTo(()=> myStaff)
mystaff!:myStaff

}