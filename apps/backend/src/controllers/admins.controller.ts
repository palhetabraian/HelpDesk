import { Request, Response } from 'express';
import { hash } from 'bcryptjs';

import { prisma } from '../infra/database/prisma';
import { createAdminSchema } from '../schemas/admins.schema';
import { AppError } from '../shared/errors/AppError';

export class AdminsController {
  async index(request: Request, response: Response) {
    const admins = await prisma.user.findMany({
      where: {
        role: 'ADMIN',
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return response.json(admins);
  }

  async create(request: Request, response: Response) {
    const data = createAdminSchema.parse(request.body);

    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userWithSameEmail) {
      throw new AppError('Ja existe um usuario com este e-mail.', 409);
    }

    const passwordHash = await hash(data.password, 8);

    const admin = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: passwordHash,
        role: 'ADMIN',
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

    return response.status(201).json(admin);
  }
}
