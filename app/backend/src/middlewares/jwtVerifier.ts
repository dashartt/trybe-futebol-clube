import { NextFunction, Response, Request } from 'express';
import AuthService from '../services/auth.service';

export default function jwtVerifier(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization;

  const payload = AuthService.getDataToken(token);

  if (payload.error) {
    return res.status(payload.error.status).json({ message: payload.error.message });
  }
  next();
}
