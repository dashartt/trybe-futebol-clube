import { compareSync } from 'bcryptjs';
import User from '../database/models/User';
import { IErrorPayload, IUserLogin } from '../protocols';
import errors from './errors';

const { invalidLoginData, userNotFound } = errors;

export default class LoginService {
  static checkEmailPassword({ email, password }: IUserLogin): void | IErrorPayload {
    if (!email || !password || password?.length < 6) {
      return invalidLoginData;
    }
  }

  static async isValidData({ email, password }: IUserLogin): Promise<void | IErrorPayload> {
    const user = await User.findOne({ where: { email } });

    if (!user || !compareSync(password, user?.password)) {
      return userNotFound;
    }
  }

  static async getRole(email: string) {
    const role = await User.findOne({ where: { email }, attributes: ['role'] });

    return role;
  }
}
