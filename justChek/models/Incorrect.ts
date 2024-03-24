import { Table,Model,Column,AutoIncrement,PrimaryKey } from "sequelize-typescript";

@Table({
  timestamps:false
})
export class Incorrect extends Model{
@PrimaryKey
@AutoIncrement
@Column
id!:number

@Column
isIncorrect!:number


}