// controller responsavel pelo perfil de usuario
import { Request, Response } from 'express';
import { updateProfileSchema } from '../schemas/users.schemas';
import { AppError } from '../shared/errors/AppError';

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

  //responsavel por atualizar o usuario
  async update(request: Request, response: Response) {
    //pegando o perfil vindo do body
    const data = updateProfileSchema.parse(request.body);

    // verifica se existe usuario com o mesmo email
    if (data.email) {
      const userWithSameEmail = await prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

      // verificando se existe usuario com o mesmo email
      if (userWithSameEmail && userWithSameEmail.id !== request.user!.id) {
        throw new AppError('Já existe um usuário com este e-mail', 409);
      }
    }

    const user = await prisma.user.update({
      where: {
        id: request.user!.id,
      },
      data,
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
