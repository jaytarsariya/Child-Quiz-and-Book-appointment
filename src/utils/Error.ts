import { Response } from 'express';

export class ErrorHandler {
  async Error( res:Response) {      
      return res.status(404).json({error:'Staff is not Availabe at this Error handler is working'});
   
  }
}

// export { CustomError };
