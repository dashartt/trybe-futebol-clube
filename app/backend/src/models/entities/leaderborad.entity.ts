import IScore from '../../protocols/score';

export default class LeaderBoard {
  private scores: IScore[];

  constructor(scores: IScore[]) {
    this.scores = scores;
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
}
