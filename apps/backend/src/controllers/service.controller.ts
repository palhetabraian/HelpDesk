import { Request, Response } from 'express';

import { prisma } from '../infra/database/prisma';
import {
  createServiceSchema,
  updateServiceSchema,
} from '../schemas/services.schema';
import { AppError } from '../shared/errors/AppError';

export class ServicesController {
  async index(request: Request, response: Response) {
    const services = await prisma.service.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return response.json(services);
  }

  async create(request: Request, response: Response) {
    const data = createServiceSchema.parse(request.body);

    const service = await prisma.service.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return response.status(201).json(service);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const data = updateServiceSchema.parse(request.body);

    const service = await prisma.service.findUnique({
      where: {
        id,
      },
    });

    if (!service) {
      throw new AppError('Serviço não encontrado.', 404);
    }

    const updatedService = await prisma.service.update({
      where: {
        id,
      },
      data,
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return response.json(updatedService);
  }

  async deactivate(request: Request, response: Response) {
    const { id } = request.params;

    const service = await prisma.service.findUnique({
      where: {
        id,
      },
    });

    if (!service) {
      throw new AppError('Serviço não encontrado.', 404);
    }

    const deactivatedService = await prisma.service.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return response.json(deactivatedService);
  }
}
