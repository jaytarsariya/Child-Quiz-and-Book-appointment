import { Table,Model,Column, PrimaryKey, AutoIncrement } from "sequelize-typescript";

@Table({
  timestamps:false
})

export class UserDetail extends Model{
@PrimaryKey
@AutoIncrement
@Column
id!:number

@Column({
  type:'VARCHAR(10)',
  unique:true,
  validate:{
    len:[10,10]
  }
})
phonNo!:number


@Column({
  defaultValue:null
})
OTP!:number

}