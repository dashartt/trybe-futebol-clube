import { IMatch, ITeam } from '../../protocols';
import IScore from '../../protocols/score';
import Score from './score.entity';

export default class LeaderBoard {
  private scores: IScore[];
  private teams: ITeam[];
  private matches: IMatch[];

  constructor(teams: ITeam[], matches: IMatch[]) {
    this.teams = teams;
    this.matches = matches;
  }

  build() {
    this.scores = this.teams.map(({ teamName, id }) => (
      new Score(teamName, id, this.matches).buildScore().getScore()));

    return this;
  }

  sort() {
    return this.scores.sort((prev, next) => {
      const byTotalPoints = next.totalPoints - prev.totalPoints;

      if (byTotalPoints !== 0) { return byTotalPoints; }

      const byTotalWins = next.totalVictories - prev.totalVictories;

      if (byTotalWins !== 0) { return byTotalWins; }

      const byGoalsBalance = next.goalsBalance - prev.goalsBalance;

      if (byGoalsBalance !== 0) { return byGoalsBalance; }

      const byGoalsFavor = next.goalsFavor - prev.goalsOwn;

      if (byGoalsFavor !== 0) { return byGoalsFavor; }

      const byGoalsOwn = next.goalsOwn - prev.goalsOwn;
      return byGoalsOwn;
    });
  }

  get() {
    return this.build().sort();
  }
}
