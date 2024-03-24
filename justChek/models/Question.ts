import { Table,Column,Model,PrimaryKey,AutoIncrement, DataType, HasOne, HasMany  } from "sequelize-typescript";
import { Option } from "./Options";
import { Answer } from "./Answer";

@Table({
  timestamps:false
})

export class Question extends Model{
  @PrimaryKey
  @AutoIncrement
  @Column
  id!:number

  @Column
  category!:string

  @Column
  question!:string
  
  @Column({defaultValue:false})
  isYesNo:boolean

  @Column
  correctOptionIndex!:number

  @HasMany(()=> Option)
  option!:Option[]

  @HasOne(()=> Answer)
  qanswer!:Option
}


