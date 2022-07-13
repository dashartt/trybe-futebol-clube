import { IMatch, TGoals } from '../../protocols';
import IScore from '../../protocols/score';

export default class Score {
  private name = '';
  private totalPoints = 0;
  private totalGames = 0;
  private totalVictories = 0;
  private totalDraws = 0;
  private totalLosses = 0;
  private goalsFavor = 0;
  private goalsOwn = 0;
  private goalsBalance = 0;
  private efficiency = 0;

  private currentTeamId: number;
  private matches: IMatch[];
  private score: IScore;

  constructor(currentTeamName: string, matches: IMatch[], currentTeamId = 0) {
    this.name = currentTeamName;
    this.currentTeamId = currentTeamId;
    this.matches = matches;
  }

  private identifyTeams(match: IMatch) {
    const currentTeam = { goals: 0 } as TGoals;
    const enemyTeam = { goals: 0 } as TGoals;

    if (match.homeTeam === this.currentTeamId) {
      currentTeam.goals = match.homeTeamGoals;
      enemyTeam.goals = match.awayTeamGoals;
    } else {
      currentTeam.goals = match.awayTeamGoals;
      enemyTeam.goals = match.homeTeamGoals;
    }

    return {
      currentTeam,
      enemyTeam,
    };
  }

  private filterMatchByCurrentTeam() {
    this.matches = this.matches
      .filter(({ homeTeam, awayTeam }) => (
        homeTeam === this.currentTeamId || awayTeam === this.currentTeamId
      ));
  }

  private calculateGoals(currentTeam: TGoals, enemyTeam: TGoals) {
    this.goalsFavor += currentTeam.goals;
    this.goalsOwn += enemyTeam.goals;
  }

  private calculateTotalPoints() {
    this.matches
      .forEach((match) => {
        const { currentTeam, enemyTeam } = this.identifyTeams(match);

        this.calculateGoals(currentTeam, enemyTeam);

        if (currentTeam.goals > enemyTeam.goals) {
          this.totalPoints += 3;
          this.totalVictories += 1;
        }
        if (currentTeam.goals < enemyTeam.goals) {
          this.totalPoints += 0;
          this.totalLosses += 1;
        }
        if (currentTeam.goals === enemyTeam.goals) {
          this.totalPoints += 1;
          this.totalDraws += 1;
        }
      });
  }

  private calculateEfficiency() {
    this.efficiency = parseFloat(
      ((this.totalPoints / (this.totalGames * 3)) * 100)
        .toFixed(2),
    );
  }

  private calculateGoalsBalance() {
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
  }

  private calculateTotalsGames() {
    this.totalGames = this.matches.length;
  }

  private calculateAll() {
    this.calculateTotalsGames();
    this.calculateTotalPoints();
    this.calculateGoalsBalance();
    this.calculateEfficiency();
  }

  public buildScore() {
    this.filterMatchByCurrentTeam();
    this.calculateAll();

    this.score = {
      name: this.name,
      totalPoints: this.totalPoints,
      totalGames: this.totalGames,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      totalLosses: this.totalLosses,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
      goalsBalance: this.goalsBalance,
      efficiency: this.efficiency,
    };

    return this;
  }

  public getScore() { return this.score; }
}
