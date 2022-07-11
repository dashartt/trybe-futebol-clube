import { sign, verify } from 'jsonwebtoken';
import { IUserLogin } from '../protocols';
import { config, secret } from '../configs/auth';

export default class AuthService {
  static generateToken(data: Omit<IUserLogin, 'password'>) {
    return sign(data, secret, config);
  }

  static getDataToken(token: string | undefined) {
    if (!token) return;

    return verify(token, secret);
  }
}
