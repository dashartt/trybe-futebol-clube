import { NextFunction, Response, Request } from 'express';
import { IErrorPayload } from '../protocols';

export default function handleError(
  err: IErrorPayload,
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
