import { sign, verify } from 'jsonwebtoken';
import { IErrorPayload, IToken, IUserLogin } from '../protocols';
import { config, secret } from '../configs/auth';
import errors from './errors';

const { invalidToken } = errors;

export default class AuthService {
  static generateToken(data: Omit<IUserLogin, 'password'>) {
    return sign(data, secret, config);
  }

  static getDataToken(token: string | undefined) {
    if (!token) {
      return {
        payload: null,
        error: invalidToken as IErrorPayload,
      };
    }

    try {
      const responseToken = verify(token, secret) as IToken;
      return {
        payload: responseToken,
        error: null,
      };
    } catch (error) {
      return {
        payload: null,
        error: invalidToken as IErrorPayload,
      };
    }
  }
}
