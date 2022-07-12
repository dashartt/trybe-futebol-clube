import { Router } from 'express';
import MatchController from '../controllers/match.controller';
import jwtVerifier from '../middlewares/jwtVerifier';

const matchRoutes = Router();

matchRoutes.post(
  '/',
  jwtVerifier,
  MatchController.searchNonExistentTeam,
  MatchController.searchDuplicateTeam,
  MatchController.create,
);

matchRoutes.get(
  '/',
  MatchController.getAll,
);

matchRoutes.patch(
  '/:id/finish',
  MatchController.changeProgress,
);

export default matchRoutes;
