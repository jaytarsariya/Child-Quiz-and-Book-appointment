import { Request, Response } from 'express';
import { ChildService } from '../service/childService';
import { LoginDTO, RegisterChildDTO } from '../../dto/childDto';
import { childValidator, jwtverifytoken } from '../../utils/validator';
import jwt from 'jsonwebtoken';
const childservice = new ChildService();

export const CreateChild = async (
  req: Request,
  res: Response
): Promise<any> => {
  const token = req.headers.token;
  const checktoken = jwtverifytoken(token);
  console.log(checktoken, 'controler check token here');

  const data: RegisterChildDTO = req.body;
  try {
    const newChild = await childservice.CreateChild(data, checktoken);

    if (newChild === null) {
      res.status(404).json({ Error: 'At least one child is required !' });
    }
    res.status(200).json({ data: newChild });
  } catch (error) {
    console.log(error, ' create child error !');
  }
};

// export const LoginUser = async(req:Request,res:Response):Promise<any>=>{
//  const {phoneNO} = req.body
//  const child = await childservice.LoginUser(phoneNO)
//  console.log(child,'q3456789ok');

//  if(child == null){
//   res.status(404).json({Error:'Invalid phone number pls try again !'})
//  }
//  res.status(200).json({data:`One time otp of login ${child}`})
// }

// export const CheckOtp = async(req:Request,res:Response):Promise<void>=>{
//   try {
//    const {phoneNO} = req.body
//  const otp = (req.query.OTP)
// const data = await childservice.CheckOtp(otp,phoneNO)
// console.log(data,'hamar vala data');

// if(data === null){
//   res.status(404).json({Error:'Invalid details pls try again !'})
// }
//  const token = jwt.sign({id:data.id},"SECRETTOKENKEY")
//  res.status(200).json({message:'login success !',token:token})

// } catch (error) {
//     console.log(error,'check otp error');
// }

// }

export const RegisterUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { phonNo } = req.body;
    console.log(phonNo, 'loggg');
    const data = await childservice.RegisterUser(phonNo);
    if (data === null) {
      return res
        .status(404)
        .json({ Error: 'your phone number is already registered !' });
    }
    return res.status(200).json({ message: data });
  } catch (error) {
    console.log(error, 'regidsterphone error...');
  }
};

export const LoginUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { phoneNo } = req.body;

    const data = await childservice.LoginWithPhone(phoneNo);
    if (data === null) {
      return res
        .status(404)
        .json({ Error: 'your phone number is not registered !' });
    }
    return res
      .status(200)
      .json({ message: `Send otp on your phone number : ${data}` });
  } catch (error) {
    res.send(' already exist phone number pls try agin !');
    console.log(error, 'Login: User: Error ..');
  }
};

export const CheckOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const detail: LoginDTO = req.body;
    const data = await childservice.CheckOTP(detail);
    if (data === null) {
      res.status(404).json({ error: 'Invalid phone number pls try again !' });
    }
    const token = jwt.sign({ id: data.id }, 'TOKENSECRETKEY', {
      expiresIn: '1h',
    });
    res.status(200).json({ message: 'login success ', Token: token });
  } catch (error) {
    console.log(error, ' ChekOTP : Error ...');
  }
};
