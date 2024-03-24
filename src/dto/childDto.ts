import { User } from '../models/User';

export class RegisterChildDTO {
  name: string;
  // phoneNO:number
  children: [
    {
      childname: string;
      dateofbirth: Date;
      age: number;
    }
  ];
}
export interface ChildInterface {
  childname: string;
  month: number;
}
export class RegisterChildDTO1 {
  name: string;
  phoneNO: number;
  numberOfChild: number;
  childName: string;
  numberOfMonths: number;
  userId: number;
}

export class LoginDTO {
  phoneNO: number;
  OTP: number;
}

export class RegisterDTO {
  phonNo: number;
}

export class testdto {
  question: string;
  category: string;
  correctOptionIndex: number;
  option: [
    {
      option: string;
    }
  ];
}

export class ResultDTO {
  questionId: number;
  SelectedOptionId: number;
}

export class MyDTO {
  category: string;
  question: string;
  a: string;
  b: string;
  c: string;
  d: string;
  correct: string;
  judgings: [
    {
      name: string;
      a: string;
      b: string;
      c: string;
      d: string;
    }
  ];
}

export class multipleDTO {
  // category:string
  questionm: string;
  optionm: string;
  correctm: string;
}




