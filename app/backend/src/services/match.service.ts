import Team from '../database/models/Team';
import { IErrorPayload, IMatch } from '../protocols';
import errors from './errors';

const { invalidMatch, invalidTeam } = errors;

export default class MatchService {
  static async verifyDuplicateTeam(match: IMatch) {
    const { homeTeam, awayTeam } = match;

    const duplicateTeam = homeTeam === awayTeam;

    if (duplicateTeam) {
      return {
        payload: null,
        error: invalidMatch as IErrorPayload,
      };
    }
  }

  static async verifyNonExistentTeam(homeTeamId: number, awayTeamId: number) {
    const awayTeam = await Team.findOne({ where: { id: homeTeamId } });
    const homeTeam = await Team.findOne({ where: { id: awayTeamId } });

    if (!awayTeam || !homeTeam) {
      return {
        payload: null,
        error: invalidTeam as IErrorPayload,
      };
    }
  }
}
