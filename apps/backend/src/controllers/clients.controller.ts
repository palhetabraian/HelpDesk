import { Request, Response } from 'express';

import { z, ZodError } from 'zod';

import { uploadConfig } from '../configs/upload';

import { DiskStorage } from '../providers/disk.storage';

import { prisma } from '../infra/database/prisma';

import { updateClientSchema } from '../schemas/users.schemas';
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

  async updateAvatar(request: Request, response: Response) {
    const diskStorage = new DiskStorage();

    try {
      const fileSchema = z
        .object({
          filename: z.string().min(1, 'Arquivo é obrigatório'),
          mimetype: z
            .string()
            .refine(
              (type) => uploadConfig.ACCEPTED_IMAGE_TYPES.includes(type),
              'Formato de arquivo inválido'
            ),
          size: z
            .number()
            .positive()
            .refine(
              (size) => size <= uploadConfig.MAX_FILE_SIZE,
              `Arquivo excede o tamanho máximo de ${uploadConfig.MAX_SIZE}MB.`
            ),
        })
        .passthrough();

      const file = fileSchema.parse(request.file);

      //recuperando o client
      const client = await prisma.user.findUnique({
        where: {
          id: request.user!.id,
        },
      });

      if (!client || client.role !== 'CLIENT') {
        await diskStorage.deleteFile(file.filename, 'tmp');

        throw new AppError('Cliente não encontrado.', 404);
      }

      const filename = await diskStorage.saveFile(file.filename);

      const updatedClient = await prisma.user.update({
        where: {
          id: client.id,
        },
        data: {
          avatarURL: filename,
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
      });

      return response.json(updatedClient);
    } catch (error) {
      if (error instanceof ZodError) {
        if (request.file) {
          await diskStorage.deleteFile(request.file.filename, 'tmp');
        }
        throw new AppError(error.issues[0].message);
      }

      throw error;
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const client = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!client || client.role !== 'CLIENT') {
      throw new AppError('Cliente não encontrado.', 404);
    }

    await prisma.user.delete({
      where: {
        id,
      },
    });

    return response.status(204).send();
  }
}
