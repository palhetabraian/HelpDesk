import { NextFunction, Request, Response } from 'express';

import { prisma } from '../../infra/database/prisma';
import { AppError } from '../errors/AppError';

export async function ensureTechnicianPasswordChanged(
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (request.user?.role !== 'TECHNICIAN') {
    return next();
  }

  const technician = await prisma.user.findUnique({
    where: {
      id: request.user.id,
    },
  });

  if (!technician || technician.role !== 'TECHNICIAN') {
    throw new AppError('Tecnico nao encontrado.', 404);
  }

  if (technician.mustChangePassword) {
    throw new AppError('Altere sua senha antes de continuar.', 403);
  }

  return next();
}
