import { Router } from "express";
import LoginController from '../controllers/login.controller';

const loginRoutes = Router();
const loginControler = new LoginController();

loginRoutes.post('/',
    loginControler.checkFields,
    // loginControler.checkUser,
    loginControler.login);

export default loginRoutes;