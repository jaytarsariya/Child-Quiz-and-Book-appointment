import { Table,Model,Column,AutoIncrement,PrimaryKey } from "sequelize-typescript";

@Table({
  timestamps:false
})
export class Score extends Model{
@PrimaryKey
@AutoIncrement
@Column
id!:number

@Column
score!:number


}