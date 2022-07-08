import { Router } from 'express';
import LoginController from '../controllers/login.controller';

const loginRoutes = Router();

loginRoutes.post(
  '/',
  LoginController.checkFields,
  LoginController.checkLogin,
  LoginController.login,
);

loginRoutes.get(
  '/validate',
  LoginController.checkRole,
);

export default loginRoutes;
