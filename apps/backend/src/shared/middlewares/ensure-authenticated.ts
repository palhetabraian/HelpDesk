import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

import { authConfig } from '../../configs/auth';
import { AppError } from '../errors/AppError';

type TokenPayload = JwtPayload & {
  role: string;
};

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  //recuperando o token do header
  const authHeader = request.headers.authorization;

  //verifica se o token existe
  if (!authHeader) {
    throw new AppError('Token JWT nao encontrado.', 401);
  }
  //formata o token retirando o ""
  const [, token] = authHeader.split(' ');

  //verifica se o token ta certo
  try {
    const decoded = verify(token, authConfig.jwt.secret) as TokenPayload;

    if (!decoded.sub) {
      throw new AppError('Token JWT invalido.', 401);
    }
    // passa para o id e a role o token
    request.user = {
      id: decoded.sub,
      role: decoded.role,
    };

    return next();
  } catch {
    throw new AppError('Token JWT invalido.', 401);
  }
}
