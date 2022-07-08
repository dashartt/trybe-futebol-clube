import { ErrorPayload, UserLogin } from '../protocols';
import errors from './errors';

const { userInvalidFields } = errors;

export default class LoginService {
  static checkFields({ email, password }: UserLogin): void | ErrorPayload {
    if (!email || !password || password?.length < 6) {
      return userInvalidFields;
    }
  }
}
