import UserModel from "../database/models/User";
import { ErrorPayload, User, UserLogin, VerifyService} from "../protocols";


export default class LoginService implements VerifyService<User> {    

    verifyFields({ email, password }: UserLogin): void | never {
        if (!email || !password ||password?.length < 6) {
            throw { status: 400, message: 'All fields must be filled'} as ErrorPayload;
        }  
    }

    // async verifyLogin({ email, password }: UserLogin): Promise<void> | never {
    //     const user = await UserModel.findOne({ where: { email, password} });

    //     if (!user) {
    //         throw { status: 400, message: 'not found'  } as ErrorPayload;
    //     }
    // }
}