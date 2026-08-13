import { Request, Response } from 'express';
import { hash } from 'bcryptjs';

import { prisma } from '../infra/database/prisma';
import { createAdminSchema, updateAdminSchema } from '../schemas/admins.schema';
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

  async update(request: Request, response: Response) {
    const id = String(request.params.id);
    const data = updateAdminSchema.parse(request.body);

    const admin = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!admin || admin.role !== 'ADMIN') {
      throw new AppError('Administrador nao encontrado.', 404);
    }

    const userWithSameEmail = await prisma.user.findFirst({
      where: {
        email: data.email,
        NOT: {
          id,
        },
      },
    });

    if (userWithSameEmail) {
      throw new AppError('Ja existe um usuario com este e-mail.', 409);
    }

    const updatedAdmin = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        email: data.email,
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

    return response.json(updatedAdmin);
  }

  async delete(request: Request, response: Response) {
    const id = String(request.params.id);

    const admin = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!admin || admin.role !== 'ADMIN') {
      throw new AppError('Administrador nao encontrado.', 404);
    }

    await prisma.user.delete({
      where: {
        id,
      },
    });

    return response.status(204).send();
  }
}

