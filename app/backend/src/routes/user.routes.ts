import { Router } from 'express';
import jwtVerifier from '../middlewares/jwtVerifier';
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
  jwtVerifier,
  LoginController.checkRole,
);

export default loginRoutes;
