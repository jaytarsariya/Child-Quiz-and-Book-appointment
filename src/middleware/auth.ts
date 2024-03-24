import { Request,Response,NextFunction } from "express";
const tokenkey ="TOKENSECRETKEY"
import jwt from 'jsonwebtoken'
import { UserDetail } from "../models/userDetails";


export const UserAuth = async (req:Request,res:Response,next:NextFunction) => {
  try {
    const token = (req.headers.authorization as string)
    console.log(req.headers.authorization,'my token logg');
    
    if(!token){
     return res.status(404).json({Error:'Unauthorize token !'})
    }  

    
    let verifytoken:any 
    try {
    verifytoken = await jwt.verify(token,"TOKENSECRETKEY")    
      
    } catch (error) {
      console.log(error, 'auth user error');
      return res.status(404).json({ error: 'Token is invalid...' });
    }

    
    if(!verifytoken){
      return res.status(404).json({error:'token is invalid...'})     
    }
    const check = await UserDetail.findOne({where:{id:verifytoken.id}})     
    if(!check){
     return res.status(404).json({message:'You dont have permission !'})
    }
    next()
   
  } catch (error) {
        console.log(error,'auth user error');
        res.status(500).json({ error: 'Internal Server Error' })
   
  }
}