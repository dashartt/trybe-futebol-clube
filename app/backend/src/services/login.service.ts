import User from '../database/models/User';
import { ErrorPayload, UserLogin } from '../protocols';
import errors from './errors';

const { invalidLoginData, userNotFound } = errors;

export default class LoginService {
  static checkEmailPassword({ email, password }: UserLogin): void | ErrorPayload {
    if (!email || !password || password?.length < 6) {
      return invalidLoginData;
    }
  }

  static async isValidData({ email, password }: UserLogin): Promise<void | ErrorPayload> {
    const user = await User.findOne({ where: { email, password } });

    if (!user) return userNotFound;
  }

  static async getRole(email: string) {
    const role = await User.findOne({ where: { email }, attributes: ['role'] });

    return role;
  }
}
