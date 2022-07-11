// ENTITIES
export interface UserLogin {
  email: string;
  password: string;
}

export interface User extends UserLogin{
  id?: number;
  username: string;
  role: string;
}

export interface Team {
  id?: number, 
  teamName: string
}

export interface TeamNames {
  teamHome: {
    teamName: Pick<Team, 'teamName'>,
  },
  teamAway: {
    teamName: Pick<Team, 'teamName'>,
  }
}

export interface Match {
  id?: number,
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamHome?: Pick<TeamNames, 'teamHome'>,
  teamAway?: Pick<TeamNames, 'teamAway'>,
}

// SERVICES
export interface ErrorPayload {
  status: number,
  message: string,
}

export interface VerifyService<T> {
  verifyFields(data: T, error: ErrorPayload): void | Error;
}
