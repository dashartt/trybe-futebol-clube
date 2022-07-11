import { Router } from 'express';
import MatchController from '../controllers/match.controller';
import jwtVerifier from '../middlewares/jwtVerifier';

const matchRoutes = Router();

matchRoutes.post(
  '/',
  jwtVerifier,
  MatchController.create,
);

matchRoutes.get(
  '/',
  MatchController.getAll,
);

export default matchRoutes;
