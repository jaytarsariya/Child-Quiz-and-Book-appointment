
import { Table,Column,PrimaryKey,AutoIncrement,Model, HasMany, DataType, HasOne } from "sequelize-typescript";
import { Child } from "./Child";
import { UserStaff } from "./staffUser";

@Table({
  timestamps:false
})
export class sUser extends Model{
  @PrimaryKey
  @AutoIncrement
  @Column
  id!:number

  @Column
  name!:string

  @Column({
    type:'VARCHAR(10)',
    validate:{
      len:[10,10]
    }
  })
  phone!:number

}