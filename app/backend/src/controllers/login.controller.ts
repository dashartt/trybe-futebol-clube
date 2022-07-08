import { NextFunction, Response, Request } from 'express';
import { User } from '../protocols';

import AuthService from '../services/auth.service';
import LoginService from '../services/login.service';

export default class LoginController {
  async login(req: Request, res: Response, next: NextFunction) {
    const { email } : User = req.body;
    const token = new AuthService().generateToken({ email });
    return res.status(200).json({ token });
  }

  // async checkUser(req: Request, res: Response, next: NextFunction) {
  //     const { email, password } : User = req.body;
  //     new LoginService()
  //         .verifyLogin({ email, password})
  //         .then(() => next())
  //         .catch((error) => {
  //             console.log(error);

  //             next(error)
  //         })
  // }

  checkFields(req: Request, res: Response, next: NextFunction) {
    try {
      new LoginService().verifyFields(req.body as User);
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
