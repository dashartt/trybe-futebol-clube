import { NextFunction, Response, Request } from 'express';
import { ErrorPayload } from '../protocols';

export default function (
  err: ErrorPayload,
  _req: Request,
  res: Response,
  _next: NextFunction,
): Response {
  if (err.status) {
    return res
      .status(err.status)
      .json({ message: err.message });
  }
  return res
    .status(500)
    .json({ message: err.message });
}
