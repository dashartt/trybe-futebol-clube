import { NextFunction, Response, Request } from 'express';
import { User } from '../protocols';

import AuthService from '../services/auth.service';
import LoginService from '../services/login.service';

export default class LoginController {
  static async login(req: Request, res: Response, _next: NextFunction) {
    const { email } : User = req.body;
    const token = AuthService.generateToken({ email });
    return res.status(200).json({ token });
  }

  static checkFields(req: Request, _res: Response, next: NextFunction) {
    const error = LoginService.checkFields(req.body as User);
    if (error) { return next(error); }

    next();
  }
}
