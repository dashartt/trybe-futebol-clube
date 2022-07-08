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

// SERVICES
export interface ErrorPayload {
  status: number,
  message: string,
}

export interface VerifyService<T> {
  verifyFields(data: T, error: ErrorPayload): void | Error;
}
