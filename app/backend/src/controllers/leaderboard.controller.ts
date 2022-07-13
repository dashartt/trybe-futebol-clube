import { NextFunction, Response, Request } from 'express';
import Team from '../database/models/Team';
import Match from '../database/models/Match';
import Score from '../models/entities/score.entity';
import LeaderBoard from '../models/entities/leaderborad.entity';

export default class LeaderboardController {
  static async getScores(_req: Request, res: Response, _next: NextFunction) {
    const matches = await Match.findAll({ where: { inProgress: false } });
    const teams = await Team.findAll();
    const leaderboard = new LeaderBoard(teams, matches).get();

    return res.status(200).json(leaderboard);
  }
}
