import { NextFunction, Response, Request } from 'express';
import TeamModel from '../database/models/Team';
import Match from '../database/models/Match';

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
}
