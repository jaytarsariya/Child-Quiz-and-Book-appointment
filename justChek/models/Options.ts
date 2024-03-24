import { Table,Column,Model,PrimaryKey,AutoIncrement, DataType, ForeignKey, HasOne, BelongsTo } from "sequelize-typescript";
import { Question } from "./Question";
import { Answer } from "./Answer";

@Table({
  timestamps:false
})

export class Option extends Model{
  @PrimaryKey
  @AutoIncrement
  @Column
  id!:number

  @Column({
    type:DataType.STRING
  })
  option!:string

  @ForeignKey(() => Question)
  @Column
  queId!:number

  @BelongsTo(()=>Question)
  questions!:Question

  @HasOne(()=> Answer)
  oanswer!:Answer
}