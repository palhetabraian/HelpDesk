import { Request, Response } from 'express';

import { prisma } from '../infra/database/prisma';

import {
  UpdateClientInput,
  updateClientSchema,
} from '../schemas/users.schemas';
import { AppError } from '../shared/errors/AppError';

export class ClientsController {
  async index(request: Request, response: Response) {
    const clients = await prisma.user.findMany({
      where: {
        role: 'CLIENT',
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatarURL: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return response.json(clients);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const data = updateClientSchema.parse(request.body);

    const client = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!client || client.role !== 'CLIENT') {
      throw new AppError('Cliente não encontrado.', 404);
    }

    if (data.email) {
      const userWithSameEmail = await prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

      if (userWithSameEmail && userWithSameEmail.id !== id) {
        throw new AppError('Já existe um usuário com este e-mail.', 409);
      }
    }

    const updatedClient = await prisma.user.update({
      where: {
        id,
      },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatarURL: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return response.json(updatedClient);
  }
}
