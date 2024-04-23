import { Table,Column,PrimaryKey,AutoIncrement,Model, HasMany, DataType } from "sequelize-typescript";
import { Child } from "./Child";

@Table({
  timestamps:false
})
export class User extends Model{
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
  phoneNO!:number 


  @HasMany(()=> Child)
  children!:Child[]
}