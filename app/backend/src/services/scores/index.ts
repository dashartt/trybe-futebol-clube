import { IMatch, TGoals } from "../../protocols";
import IScore from "../../protocols/score";

export default class Score implements IScore {
  private _name: string = '';
  private _totalPoints: number = 0;   // P
  private _totalGames: number = 0;     // J 
  private _totalVictories: number = 0; // V
  private _totalDraws: number = 0;     // E
  private _totalLosses: number = 0;    // D
  private _goalsFavor: number = 0;    // GP
  private _goalsOwn: number = 0;       // GC
  private _goalsBalance: number = 0;  // SG
  private _efficiency: number = 0;     // percent

  private currentTeamId: number;
  private _matches: IMatch[];

  constructor(currentTeamName: string, currentTeamId: number, matches: IMatch[]) {
    this._name = currentTeamName;
    this.currentTeamId = currentTeamId;
    this._matches = matches;
  }

  get name() { return this._name; }
  get totalPoints() { return this._totalPoints; }
  get totalGames() { return this._totalGames; }
  get totalVictories() { return this._totalVictories; }
  get totalDraws() { return this._totalDraws; }
  get totalLosses() { return this._totalLosses; }
  get goalsFavor() { return this._goalsFavor; }
  get goalsOwn() { return this._goalsOwn; }
  get goalsBalance() { return this._goalsBalance; }
  get efficiency() { return this._efficiency; }

  identifyTeams(match: IMatch) {
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
    }
  }

  filterMatchByCurrentTeam() {
    this._matches = this._matches
      .filter(({ homeTeam, awayTeam }) => (
        homeTeam === this.currentTeamId || awayTeam === this.currentTeamId
      ));
  }

  calculateGoals(currentTeam: TGoals, enemyTeam: TGoals) {
    this._goalsFavor += currentTeam.goals;
    this._goalsOwn += enemyTeam.goals;
  }

  calculateTotalPoints() {
    this._matches
      .forEach((match) => {

        const { currentTeam, enemyTeam } = this.identifyTeams(match);
        
        this.calculateGoals(currentTeam, enemyTeam);
        

        if (currentTeam.goals > enemyTeam.goals) {
          this._totalPoints += 3;
          this._totalVictories += 1;
        }
        if (currentTeam.goals < enemyTeam.goals) {
          this._totalPoints += 0;
          this._totalLosses += 1;
        }
        if (currentTeam.goals === enemyTeam.goals) {
          this._totalPoints += 1;
          this._totalDraws += 1;
        }
      });
  }

  calculateEfficiency() {
    this._efficiency = parseFloat(
      (this._totalPoints / (this._totalGames * 3) * 100)
        .toFixed(2)
    );
  }

  calculateGoalsBalance() {
    this._goalsBalance = this._goalsFavor - this._goalsOwn;
  }

  calculateTotalsGames() {
    this._totalGames = this._matches.length;
  }

  calculateAll() {
    this.calculateTotalsGames();
    this.calculateTotalPoints();
    this.calculateGoalsBalance();
    this.calculateEfficiency();
  }

  buildScore() {
    this.filterMatchByCurrentTeam();
    this.calculateAll();

    return {
      name: this.name,
      totalPoints: this.totalPoints,   // P
      totalGames: this.totalGames,     // J 
      totalVictories: this.totalVictories, // V
      totalDraws: this.totalDraws,     // E
      totalLosses: this.totalLosses,    // D
      goalsFavor: this.goalsFavor,    // GP
      goalsOwn: this.goalsOwn,       // GC
      goalsBalance: this.goalsBalance,  // SG
      efficiency: this._efficiency,     // percent
    }
  }
}