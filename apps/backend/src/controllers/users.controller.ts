import { Request, Response } from 'express';
import { hash } from 'bcryptjs';

import { prisma } from '../infra/database/prisma';
import { createUserSchema } from '../schemas/users.schemas';
import { AppError } from '../shared/errors/AppError';

export class UsersController {
  async index(request: Request, response: Response) {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return response.json(users);
  }

  async create(request: Request, response: Response) {
    const data = createUserSchema.parse(request.body);

    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userWithSameEmail) {
      throw new AppError('Ja existe um usuario com este e-mail.', 409);
    }

    const passwordHash = await hash(data.password, 8);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: passwordHash,
        role: data.role,
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

    return response.status(201).json(user);
  }
}
