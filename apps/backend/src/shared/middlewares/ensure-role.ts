// middleware responsavel por quem pode acessar a rota baseado no jwt
import { NextFunction, Request, Response } from 'express';

import { AppError } from '../errors/AppError';

export function ensureRole(roles: string[]) {
  return (request: Request, response: Response, next: NextFunction) => {
    //verifica se o usuario ta logado
    if (!request.user) {
      throw new AppError('Usuário nao autenticado', 401);
    }
    // verifica se o usuario pode acessar a rota
    if (!roles.includes(request.user.role)) {
      throw new AppError('Usuário nao autorizado', 403);
    }

    return next();
  };
}
