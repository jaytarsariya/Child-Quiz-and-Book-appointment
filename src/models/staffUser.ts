import { Table,Model,Column,AutoIncrement,PrimaryKey, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Staff } from "./Staff";
import { SiftStaff } from "./siftStaff";
import { myStaff } from "./mystaff";
import { sUser } from "./Suser";

@Table({
  timestamps:false
})
export class UserStaff extends Model{
@PrimaryKey
@AutoIncrement
@Column
id!:number

@Column({
  type:DataType.DATEONLY,
})
date!:Date

@Column({
  type:DataType.TIME,
})
ustartTime!:string

@Column({
  type:DataType.TIME,
})
uendTime!:string


@Column
userid!:number


@ForeignKey(()=>myStaff)
@Column
staffid!:number

@Column({defaultValue:false})
isCanceled!:boolean

@Column
day!:string

@BelongsTo(()=> myStaff)
staff!:myStaff
}