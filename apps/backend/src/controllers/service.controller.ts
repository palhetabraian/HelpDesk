import { Request, Response } from 'express';

import { prisma } from '../infra/database/prisma';
import { createServiceSchema } from '../schemas/services.schema';

export class ServicesController {
  async index(request: Request, response: Response) {
    const services = await prisma.service.findMany({
      where: {
        isActive: true, //buscando por serviços que esteja ativo
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
}
