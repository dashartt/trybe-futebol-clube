import { NextFunction, Response, Request } from 'express';
import TeamModel from '../database/models/Team';
import Match from '../database/models/Match';
import { IMatch } from '../protocols';
import MatchService from '../services/match.service';

export default class MatchController {
  static async getAll(req: Request, res: Response, _next: NextFunction) {
    const { inProgress } = req.query;

    const matches = await Match.findAll({
      ...(inProgress ? { where: { inProgress: inProgress === 'true' } } : null),
      include: [
        { model: TeamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return res.status(200).json(matches);
  }

  static async update(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    await Match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    return res.status(200).json({ homeTeamGoals, awayTeamGoals });
  }

  static async create(req: Request, res: Response, _next: NextFunction) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;

    const match = await Match
      .create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true } as IMatch);

    return res.status(201).json(match);
  }

  static async changeProgress(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;

    await Match.update({ inProgress: false }, { where: { id } });

    return res.status(200).json({ message: 'Finished' });
  }

  static async searchDuplicateTeam(req: Request, res: Response, next: NextFunction) {
    const match = req.body as IMatch;

    const payload = await MatchService.verifyDuplicateTeam(match);

    if (payload?.error) {
      return res.status(payload?.error.status).json({ message: payload?.error.message });
    }

    next();
  }

  static async searchNonExistentTeam(req: Request, res: Response, next: NextFunction) {
    const { homeTeam, awayTeam } = req.body;

    const payload = await MatchService
      .verifyNonExistentTeam(homeTeam as number, awayTeam as number);

    if (payload?.error) {
      return res.status(payload?.error.status).json({ message: payload?.error.message });
    }

    next();
  }
}
