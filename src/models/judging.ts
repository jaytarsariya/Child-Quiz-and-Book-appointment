import { Table,Column,PrimaryKey,AutoIncrement,Model,DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { myQuestion } from "./newQuiz";

@Table({
  timestamps:false
})
export class Judging extends Model{
@PrimaryKey
@AutoIncrement
@Column
id!:number

@Column
name!:string

@Column({defaultValue:""})
uresponse!:string

@ForeignKey(() => myQuestion)
@Column
queid!:number

@BelongsTo(()=>myQuestion)
questions!:myQuestion

}