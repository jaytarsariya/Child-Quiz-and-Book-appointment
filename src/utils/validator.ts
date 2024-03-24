import { Request,Response,NextFunction } from "express";
import { RegisterChildDTO } from "../dto/childDto";

export function childValidator(data:any){
  const child = data.childDetails.numberOfChildern  
 if(child <=0){
  return null
 }  
 return data
}

// export function OTPvalidation(data:any){
//  if(data.OTP == 1234){
//   return data
//  } 
//   return null
//  }

import jwt from 'jsonwebtoken'
export function jwtverifytoken(token:any){
  const verifytoken = jwt.verify(token,"TOKENSECRETKEY")
  return verifytoken

}

export const senderror = async(req:Request,res:Response):Promise<void>=>{
res.send('Already existing phone number !')
}




export function isPastDate(date: Date, time: string) {
  const currentTime = new Date().toISOString().split('T')[1]; // Get current time
  const dateTime = new Date(`${date.toISOString().split('T')[0]}T${time}`);
  const currentDateTime = new Date(`${date.toISOString().split('T')[0]}T${currentTime}`);
console.log(dateTime,'...............',currentDateTime,'..........');
console.log(dateTime < currentDateTime,'............................../');

  // return dateTime < currentDateTime;
}