// _________________________ Staff DTO HERE ______________________

export class createStaffDTO1{
  name:string
  sift:[
    {
      day:string
      startTime:string
      endTime:string
    }
  ]
   
 }

 export class createStaffDTO{
  name:string
  startTime:string
  endTime:string
 }


 export class bookAppointmentDTO{
  name:string
  phone:number
  date:Date
  ustartTime:string
  uendTime:string
  
 }

 export class CanceledDTO{
  phone:number
  date:Date
  // ustartTime:string
  // uendTime:string
 }