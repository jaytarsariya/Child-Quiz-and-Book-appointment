import { Table,Column,Model,AutoIncrement,PrimaryKey, ForeignKey } from "sequelize-typescript";
import { Question } from "./Question";
import { Option } from "./Options";

@Table({
  timestamps:false
})

export class Answer extends Model{
  @PrimaryKey
  @AutoIncrement
  @Column
  id!:number

  @ForeignKey(()=> Question)
  @Column
  questionId!:number

  @ForeignKey(()=> Option)
  @Column
  optionId!:number

  
}