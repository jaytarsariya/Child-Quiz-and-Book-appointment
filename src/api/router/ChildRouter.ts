import express from 'express';
import {
  CheckOTP,
  CreateChild,
  LoginUser,
  RegisterUser,
} from '../controller/ChildController';
import { UserAuth } from '../../middleware/auth';

export const router = express.Router();

router.post('/create', UserAuth, CreateChild);

router.post('/login', LoginUser);

router.post('/otp', CheckOTP);

router.post('/registerphone', RegisterUser);

// router.post('/tokencheck',)
