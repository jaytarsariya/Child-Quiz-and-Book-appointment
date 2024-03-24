import { Table,Column,Model,PrimaryKey,AutoIncrement, HasMany, HasOne} from "sequelize-typescript";
import { Judging } from "./judging";

@Table({
  timestamps:false
})
export class myQuestion extends Model{
  @PrimaryKey
  @AutoIncrement
  @Column
  id!:number

  @Column
  category!:string

  @Column
  question!:string

  @Column
  a!:string

  @Column 
  b!:string

  @Column
  c!:string

  @Column
  d!:string

  @Column
  correct!:string


 @HasMany(()=> Judging)
 judgings!:Judging[]
 
}