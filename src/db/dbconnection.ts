import { Sequelize } from "sequelize-typescript";
import { User } from "../models/User";
import { Child } from "../models/Child";
import { UserDetail } from "../models/userDetails";
import { myQuestion } from "../models/newQuiz";
import { Judging } from "../models/judging";
import { UserStaff } from "../models/staffUser";
import { SiftStaff } from "../models/siftStaff";
import { myStaff } from "../models/mystaff";
import { sUser } from "../models/Suser";

export const sequelize = new Sequelize({
  dialect:'postgres',
  database:'childApp',
  username:'postgres',
  password:'jay123',
  host:'localhost',
  models:[User,Child,UserDetail,myQuestion,Judging,SiftStaff,myStaff,UserStaff,sUser],
  // models:[Question,Option,Answer],
  logging:false
})