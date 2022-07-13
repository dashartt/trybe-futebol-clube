import { NextFunction, Response, Request } from 'express';
import Team from '../database/models/Team';
import Match from '../database/models/Match';
import Score from '../services/scores';

export default class LeaderboardController {
  static async getScores(_req: Request, res: Response, _next: NextFunction) {
    const matches = await Match.findAll({ where: { inProgress: false }});    
    const teams = await Team.findAll();  
    
    const scores = teams.map(({ teamName, id}) => (
      new Score(
        teamName,
        id,
        matches)
        .buildScore()));        

    res.status(200).json(scores);
  }
}
