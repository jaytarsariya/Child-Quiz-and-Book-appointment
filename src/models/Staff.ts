import { Table,Model,Column,PrimaryKey,AutoIncrement, DataType, HasOne } from "sequelize-typescript";
import { UserStaff } from "./staffUser";

@Table({
  timestamps:false
})
export class Staff extends Model{

@PrimaryKey
@AutoIncrement
@Column
id!:number

@Column
name!:string

@Column({
  type:DataType.TIME
})
startTime!:string

@Column({
  type:DataType.TIME
})
endTime!:string

@HasOne(()=> UserStaff)
user!:UserStaff

}