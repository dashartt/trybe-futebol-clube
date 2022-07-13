import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';
const matchRoutes = Router();

matchRoutes.get(
  '/home',
  LeaderboardController.getScores
);

export default matchRoutes;
