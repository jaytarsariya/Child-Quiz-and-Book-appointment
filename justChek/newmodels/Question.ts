// models/QuestionModel.ts
import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType } from "sequelize-typescript";

@Table({
  timestamps: false,
})
export class Que extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column
  question!: string;

  @Column({
    type: DataType.ENUM("language", "emotional", "cognitive", "movement"),
  })
  category!: string;

  // @Column
  // isYesNo!: boolean;

  @Column
  answer!: string;
}
