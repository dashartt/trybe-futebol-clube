import { NextFunction, Response, Request } from 'express';
import { User, UserLogin } from '../protocols';

import AuthService from '../services/auth.service';
import LoginService from '../services/login.service';

export default class LoginController {
  static async login(req: Request, res: Response, _next: NextFunction) {
    const { email }: User = req.body;

    const token = AuthService.generateToken({ email });

    return res.status(200).json({ token });
  }

  static checkFields(req: Request, _res: Response, next: NextFunction) {
    const error = LoginService.checkEmailPassword(req.body as UserLogin);

    if (error) { return next(error); }

    next();
  }

  static async checkLogin(req: Request, _res: Response, next: NextFunction) {
    const error = await LoginService.isValidData(req.body as UserLogin);

    if (error) { return next(error); }

    next();
  }

  static async checkRole(req: Request, res: Response, _next: NextFunction) {
    const token = req.headers.authorization;

    const { email } = AuthService.getDataToken(token) as Omit<UserLogin, 'password'>;
    const role = await LoginService.getRole(email);

    return res.status(200).json(role);
  }
}
