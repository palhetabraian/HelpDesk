// controller responsavel pelo perfil de usuario
import { Request, Response } from 'express';

import { prisma } from '../infra/database/prisma';

export class ProfileController {
  async show(request: Request, response: Response) {
    //pegando o user da tabela
    const user = await prisma.user.findUnique({
      where: {
        //passando ! pq o middleware ja validou o token
        id: request.user!.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return response.json(user);
  }
}
