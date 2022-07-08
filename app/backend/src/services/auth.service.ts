import { sign, verify } from 'jsonwebtoken';
import { config, secret } from '../configs/auth';

export default class AuthService {    
       generateToken(data: any) {
            return sign(data , secret, config);         
       }

       getDataToken(token: string) {
          return verify(token, secret);          
       }
}