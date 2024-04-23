// import express, { Router }  from "express";
import { Router } from 'express';
import {
  BookAppointment,
  CtreateStaff,
  DeleteExpiredAppointment,
  Fetchbookedstaff,
  FindWithDate,
  HowManyTimeBook,
  SearchAvailableTime,
  Showstaff,
  cancelAppointment,
  deletestaff,
  findUserWithStaff,
  findWithId,
  findWithUserTimeAndDate,
  findstaffById,
  getByCondition,
  pagination,
  updateMystaff,
} from '../controller/StaffController';
export const staffrouter = Router();

staffrouter.route('/create').post(CtreateStaff);

staffrouter.get('/show', Showstaff);

// staffrouter.post('/sift',CreateSiftStaff)

staffrouter.post('/bookappointment', BookAppointment);

staffrouter.route('/view').get(Fetchbookedstaff);

staffrouter.get('/stafview/:id', findstaffById);

staffrouter.get('/getcondition', getByCondition);

staffrouter.get('/findwithdate', FindWithDate);

staffrouter.get('/usertimeanddate', findWithUserTimeAndDate);

staffrouter.get('/findwithstaff', findUserWithStaff);

staffrouter.get('/findbyid/:id', findWithId);

// __________ User side _________________
staffrouter.get('/howmanytimebook', HowManyTimeBook);

staffrouter.post('/cancelappointment', cancelAppointment);

staffrouter.get('/searchtime', SearchAvailableTime);

staffrouter.patch('/update/:id', updateMystaff);

staffrouter.delete('/delete/:id', deletestaff);

staffrouter.get('/pagination', pagination);

staffrouter.route('/expireddata').get(DeleteExpiredAppointment);
