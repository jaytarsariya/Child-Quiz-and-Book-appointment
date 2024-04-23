import {
  LoginDTO,
  RegisterChildDTO,
  RegisterChildDTO1,
  RegisterDTO,
} from '../../dto/childDto';
import { User } from '../../models/User';
import { Child } from '../../models/Child';
import { UserDetail } from '../../models/userDetails';
import moment from 'moment';

export class ChildService {
  // register child and parent
  async CreateChild(data: RegisterChildDTO, token: any): Promise<any> {
    const phone = await UserDetail.findOne({ where: { id: token.id } });
    const phonNumber = phone?.phonNo;
    const existingUser = await User.findOne({ where: { phoneNO: phonNumber } });
    if (existingUser) {
      return ' User already existing !';
    }
    // count age ........ and month .......
    const currentdate = new Date();
    const childAge = data.children.map((child: any) => {
      // const bod = new Date(child.dateofbirth)
      const bod = moment(child.dateofbirth, 'YYYY-MM-DD'); // specify the date format
      // const getmilisecond = currentdate.getTime() - bod.getTime()
      const getmilisecond = moment().diff(bod);

      const age = Math.floor(getmilisecond / (365.25 * 24 * 60 * 60 * 1000));
      const months = Math.floor(
        (getmilisecond % (365.25 * 24 * 60 * 60 * 1000)) /
          (30.44 * 24 * 60 * 60 * 1000)
      );
      return {
        childname: child.childname,
        dateofbirth: child.dateofbirth,
        numberOfYear: age,
        numberOfMonth: months,
      };
    });
    const lengthcheck = data.children.length;
    if (lengthcheck <= 0) {
      return null;
    }
    // create user and child
    const user = await User.create(
      {
        name: data.name,
        phoneNO: phonNumber,
        children: childAge,
      },
      { include: [{ model: Child, as: 'children' }] }
    );

    const userdata = {
      name: user.name,
      phoneNo: user.phoneNO,
      childData: childAge,
    };

    return { userdata };
  }

  async RegisterUser(phonNo: number): Promise<any> {
    const existingphon = await UserDetail.findOne({
      where: { phonNo: phonNo.toString() },
    });

    if (existingphon) {
      return null;
    }

    const newUser = await UserDetail.create({ phonNo });

    return newUser;
  }

  async LoginWithPhone(phonNo: number): Promise<any> {
    const findphone = await UserDetail.findOne({
      where: { phonNo: phonNo.toString() },
    });
    if (!findphone) {
      return null;
    }
    const GenOtp = Math.floor(100000 + Math.random() * 900000).toString();
    await UserDetail.update({ OTP: GenOtp }, { where: { id: findphone.id } });
    return GenOtp;
  }

  async CheckOTP(data: LoginDTO): Promise<any> {
    const userdata = await UserDetail.findOne({
      where: { phonNo: data.phoneNO.toString() },
    });
    if (!userdata) {
      return null;
    }
    if (data.OTP === userdata.OTP) {
      await UserDetail.update({ OTP: null }, { where: { id: userdata.id } });
      return userdata;
    }
    return null;
  }

  // login with phone numbere ....
  //   async LoginUser(phoneNO:number):Promise<any>{
  //   const checkuser = await User.findOne({ where: { phoneNO:phoneNO.toString() } });
  //   if(!checkuser){
  //     return null
  //   }
  //   const OTP = Math.floor(100000 + Math.random() * 900000).toString()
  //   await User.update({OTP:OTP},{where:{id:checkuser.id}})

  //   // const transporter = nodemailer.createTransport({
  //   //   host:'smtp.gmail.com',
  //   //   port:587,
  //   //   secure:false,
  //   //   requireTLS:true,
  //   //   auth:{
  //   //     user:'jaytarsariya2002@gmail.com',
  //   //     pass:'myxj wepo akxa dlmy'
  //   //   }
  //   // })

  //   // const mailOption = {
  //   //   from:'jaytarsariya2002@gmail.com',
  //   //   to:'jaytarsariya2002@gmail.com',
  //   //   subject:'OTP for childApp login. Do not share with anyone',
  //   //   text:`One time OTP : ${OTP}`
  //   // }

  //   //  transporter.sendMail(mailOption,function(error,info){
  //   //   if(error){
  //   //     console.log('Email sending error...',error);

  //   //   }else{
  //   //     console.log('Mail has been sent in your register mail ',info.response)
  //   //   }
  //   // })

  //   return OTP
  //   }

  //   // check otp and update null otp
  //   async CheckOtp(otp:any,phone:number):Promise<any>{
  //     const data = await User.findOne({where:{phoneNO:phone.toString()}})

  //     if(!data){
  //       return null
  //     }
  //     if(otp == data.OTP){
  //       await User.update({OTP:null},{where:{id:data.id}})

  //       return data
  //     }
  //     return null
  //   }
  // have a new date AND THIS CODe give me new task and how many to dry this code and this code ans this givn nyumbefr in this code do give me new code logic
}
