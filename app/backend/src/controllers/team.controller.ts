import { NextFunction, Response, Request } from 'express';
import Team from '../database/models/Team';

export default class TeamController {
  static async getAll(req: Request, res: Response, _next: NextFunction) {
    const teams = await Team.findAll();
    return res.status(200).json(teams);
  }

  static async getOne(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const team = await Team.findOne({ where: { id } });

    if (!team) return res.status(404).json({ message: 'team not found' });

    return res.status(200).json(team);
  }
}
