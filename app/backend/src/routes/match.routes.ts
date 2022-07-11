import { Router } from 'express';
import MatchController from '../controllers/match.controller';

const matchRoutes = Router();

matchRoutes.get(
  '/',
  MatchController.getAll,
);

export default matchRoutes;
