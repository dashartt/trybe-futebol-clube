export default interface IScore {
  name: string,
  totalPoints: number, // P
  totalGames: number, // J
  totalVictories: number, // V
  totalDraws: number, // E
  totalLosses: number, // D
  goalsFavor: number, // GP
  goalsOwn: number, // GC
  goalsBalance: number, // SG
  efficiency: number, // percent
}
