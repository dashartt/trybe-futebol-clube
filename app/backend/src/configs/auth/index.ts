import { Secret, SignOptions } from "jsonwebtoken";

export const secret : Secret = process.env.JWT_SECRET as string;
export const config : SignOptions = {
    expiresIn: '1h',
    algorithm: 'HS256',
  }
