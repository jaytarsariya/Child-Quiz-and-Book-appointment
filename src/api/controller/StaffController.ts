import { Request, Response } from 'express';
import { StaffService } from '../service/staffService';
import {
  CanceledDTO,
  bookAppointmentDTO,
  createStaffDTO,
  createStaffDTO1,
} from '../../dto/Staffdto';
const staffservice = new StaffService(); // intialize
import {myStaff} from '../../models/mystaff';
import {SiftStaff} from '../../models/siftStaff';


export const findQuery = async(req:Request, res:Response)=>{
  try{
    // const data  = await myStaff.findAll({  // Find all Posts with their associated User:
    //   include:[SiftStaff]
    // })

  //   const data = await myStaff.findAll({
  //     include: [{
  //         model: SiftStaff,
  //         attributes: ['mystaffid', 'day']
  //     }]
  // });
  
//   const data = await myStaff.findByPk(1, {
//     include: [SiftStaff]
// });

// const data = await SiftStaff.findAll({
//   include: [myStaff]
// });

const data = await SiftStaff.findAll({
  include: [{
      model: myStaff,
      where: {
          name: 'staff1'
      }
  }]
});



    return res.status(200).json({data:data})
  }catch(error){
    return res.status(500).json({error: error.message})
  }

}

// Create API
export const CtreateStaff = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const data: createStaffDTO1 = req.body;
    const createdata = await staffservice.CreateStaff(data);
    if (createdata === null) {
      return res
        .status(404)
        .json({
          Error: 'Already use this name pls enter diffrent satff name !',
        });
    } else if (createdata === 'invalid') {
      return res.status(404).json({ Error: 'Invalid time...' });
    }
    res.status(200).json({ data: createdata });
  } catch (error) {
    console.log(error, 'create staff error');
    res.status(404).json({ Error: 'Internal server error' });
  }
};

export const Showstaff = async (req: Request, res: Response): Promise<any> => {
  try {
    let id = req.query.id
    const viewdata = await staffservice.Showstaff(Number(id));
    console.log(viewdata)
    return res.status(200).json({ viewdata });
  } catch (error) {
    console.log(error, 'show staff error');
  }
};

export const BookAppointment = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const data: bookAppointmentDTO = req.body;
    const createdata = await staffservice.BookAppointment(data);

    if (createdata === undefined) {
      return res
        .status(400)
        .json({ Error: 'staff is not available at this time' });
    } else if (createdata == 'timenot') {
      return res
        .status(400)
        .json({ Error: 'The selected time is in the past !' });
    } else if (createdata === 'notAvailable') {
      return res.status(400).json({ Error: 'staff is not available ...' });
    } else if (createdata === 'datenotvalid') {
      return res.status(400).json({ Error: 'date is not valid' });
    } else if (createdata === 'sunday') {
      return res
        .status(400)
        .json({ Error: 'staff not available on sunday ..' });
    } else {
      res.status(200).json({ data: createdata });
    }
  } catch (error) {
    console.log(error, 'errorlogggg');
    return res.status(404).json({ Error: 'Internal server error' });
  }
};

export const Fetchbookedstaff = async (
  req: Request,
  res: Response
): Promise<any> => {
  const id = parseInt(req.params.id);
  const data = await staffservice.Fetchbookedstaff(id);
  res.send(data);
};

export const updateMystaff = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const id = parseInt(req.params.id);
    const { day, startTime, endTime } = req.body;
    const data = await staffservice.updatemystaff(id, day, startTime, endTime);
    if (data === null) {
      return res.status(404).json({ Error: 'staff not found' });
    } else if (data === 'staffnotfound') {
      return res.status(404).json({ Error: 'Staff not found pls try again !' });
    } else if (data === 'alreadybook') {
      return res
        .status(404)
        .json({
          Error: 'User booked at this time slot pls try after some time !',
        });
    } else if (data === 'userendtimeerror') {
      return res
        .status(404)
        .json({
          Error:
            'User end time is less than your update endTime pls try again !',
        });
    } else if (data === 'notfound') {
      return res.status(404).json({ Error: 'staff not found...!' });
    } else {
      return res.status(200).json({ dataUpdate: data });
    }
  } catch (error) {
    console.log(error, ' Update mystaff erorr..');
    return res.status(404).json({ Error: 'Internal server error' });
  }
};

export const findstaffById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const id = parseInt(req.params.id);
    const data = await staffservice.findstaffById(id);
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(404).json({ Error: 'Internal server error' });
  }
};

export const getByCondition = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { day, startTime, endTime } = req.body;
    const data = await staffservice.getByCondition(day, startTime, endTime);
    return res.status(200).json({ data });
  } catch (error) {
    console.log(error, 'internal server error');
  }
};

export const pagination = async (req: Request, res: Response): Promise<any> => {
  try {
    const page = parseInt(req.query.page as string);
    const perpage = parseInt(req.query.perpage as string);
    console.log(page, '................', perpage);

    const data = await staffservice.Pagination(page, perpage);
    return res.status(200).json({ data });
  } catch (error) {
    console.log(error, 'pagination error logg');
    return res.status(404).json({ Error: 'Internal server error..' });
  }
};

export const deletestaff = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const id = parseInt(req.params.id);
    const data = await staffservice.deletestaff(id);
    if (data === 'notdelete') {
      return res
        .status(404)
        .json({
          Error: 'already booked staff, not delete staff at this time !',
        });
    } else if (data === 'notfound') {
      return res.status(404).json({ Error: 'delete staff successfull...' });
    } else {
      res.status(200).json({ data });
    }
  } catch (error) {
    console.log(error, 'internal server error');
  }
};

export const FindWithDate = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { date } = req.body;
    console.log(date, 'jjjjjjjjjjjjjjjj');

    const data = await staffservice.FindWithDate(date);
    if (data === 'notDate') {
      return res.status(404).json({ Error: 'Data not found !' });
    } else if (data === 'noresponse') {
      return res.status(404).json({ Error: 'Enter date !' });
    } else {
      return res.status(200).json({ data });
    }
  } catch (error) {
    console.log(error, 'hello error');
    res.status(404).json({ Error: 'Internal server error' });
  }
};

export const findWithUserTimeAndDate = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { date, ustartTime, uendTime } = req.body;
    const data = await staffservice.findWithUserTimeAndDate(
      date,
      ustartTime,
      uendTime
    );
    if (data === 'notDate') {
      return res.status(404).json({ Error: 'Data not found !' });
    }
    return res.status(200).json({ data });
  } catch (error) {
    console.log(error, 'internal server error');
    return res.status(404).json({ Error: 'Internal server error' });
  }
};

export const findUserWithStaff = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const id = parseInt(req.query.id as string);
    const data = await staffservice.findUserWithStaff(id);
    if (data === 'notfound') {
      return res.status(404).json({ Error: 'Data not found !' });
    }
    return res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ Error: 'Internal server error' });
  }
};

export const findWithId = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = parseInt(req.params.id);
    const data = await staffservice.findWithId(id);
    if (data === 'notfound') {
      return res.status(404).json({ Error: 'Data not found !' });
    } else {
      return res.status(200).json({ data });
    }
  } catch (error) {
    console.log(error, 'internal server error');
    return res.status(404).json({ Error: 'Internal server error' });
  }
};

export const HowManyTimeBook = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const phone = req.body.phone;
    const data = await staffservice.HowManyTimeBook(phone);
    if (data === 'notfound') {
      return res.status(404).json({ Error: 'Data not found !' });
    }
    return res.status(200).json({ data });
  } catch (error) {
    console.log(error, 'internal server error');
    return res.status(404).json({ Error: 'Internal server error' });
  }
};

export const cancelAppointment = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const mydata: CanceledDTO = req.body;
    const data = await staffservice.cancelAppointment(mydata);
    if (data === 'notfound') {
      return res.status(404).json({ Error: 'Data not found !' });
    } else if (data === 'appointmentnotfound') {
      return res.status(404).json({ Error: 'Appointment not found !' });
    } else if (data === 'notbooked') {
      return res
        .status(404)
        .json({
          Error:
            'Appointment cannot be canceled as it is less than two hour away !',
        });
    } else if (data === 'alreadycancel') {
      return res
        .status(404)
        .json({ Error: 'Already Canceled this appointment !' });
    } else {
      return res.status(200).json({ data });
    }
  } catch (error) {
    console.log(error, ' cancel appointment error');
    return res.status(404).json({ Error: 'Internal server error' });
  }
};

export const SearchAvailableTime = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const date = req.body.date;
    const staffid = 1;
    const data = await staffservice.SearchAvailableTime(date);
    if (data === 'notfound') {
      return res.status(404).json({ Error: 'Data not found !' });
    } else if (data === 'full') {
      return res
        .status(404)
        .json({ Error: 'All staff is not available ! pls try another day ' });
    } else {
      return res.status(200).json({ data });
    }
  } catch (error) {
    console.log(error, ' internal server error');
    return res.status(404).json({ Error: 'Internal server error' });
  }
};

export const DeleteExpiredAppointment = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const data = await staffservice.DeleteExpiredAppointment();
    res.status(200).json({ Data: data });
  } catch (error) {
    console.log(error, 'Internal server error');
    res.status(404).json({ Error: 'Internal server error...' });
  }
};


