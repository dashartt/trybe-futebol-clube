import { Router } from 'express';
import LoginController from '../controllers/login.controller';

const loginRoutes = Router();

loginRoutes.post(
  '/',
  LoginController.checkFields,
  LoginController.login,
);

export default loginRoutes;
