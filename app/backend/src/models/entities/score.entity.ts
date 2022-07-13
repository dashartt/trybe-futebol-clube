import { IMatch, TGoals } from '../../protocols';
import IScore from '../../protocols/score';

export default class Score {
  private name = '';
  private totalPoints = 0; // P
  private totalGames = 0; // J
  private totalVictories = 0; // V
  private totalDraws = 0; // E
  private totalLosses = 0; // D
  private goalsFavor = 0; // GP
  private goalsOwn = 0; // GC
  private goalsBalance = 0; // SG
  private efficiency = 0; // percent

  private currentTeamId: number;
  private matches: IMatch[];
  private score: IScore;

  constructor(currentTeamName: string, currentTeamId: number = 0, matches: IMatch[]) {
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
      totalPoints: this.totalPoints, // P
      totalGames: this.totalGames, // J
      totalVictories: this.totalVictories, // V
      totalDraws: this.totalDraws, // E
      totalLosses: this.totalLosses, // D
      goalsFavor: this.goalsFavor, // GP
      goalsOwn: this.goalsOwn, // GC
      goalsBalance: this.goalsBalance, // SG
      efficiency: this.efficiency, // percent
    };

    return this;
  }

  public getScore() { return this.score; }

  // public filterScore(filterBy: string) {
  //   this.score = this.ma
  // }
}
