// ENTITIES
export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUser extends IUserLogin{
  id?: number;
  username: string;
  role: string;
}

export interface ITeam {
  id?: number, 
  teamName: string
}

export interface ITeamNames {
  teamHome: {
    teamName: Pick<ITeam, 'teamName'>,
  },
  teamAway: {
    teamName: Pick<ITeam, 'teamName'>,
  }
}

export interface IMatch {
  id?: number,
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamHome?: Pick<ITeamNames, 'teamHome'>,
  teamAway?: Pick<ITeamNames, 'teamAway'>,
}

// SERVICES
export interface IErrorPayload {
  status: number,
  message: string,
}

export interface IVerifyService<T> {
  verifyFields(data: T, error: IErrorPayload): void | Error;
}
