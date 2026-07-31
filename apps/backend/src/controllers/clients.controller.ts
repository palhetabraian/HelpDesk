import { Request, Response } from 'express';

import { prisma } from '../infra/database/prisma';

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
}
