import { Request, Response } from 'express';

import { prisma } from '../infra/database/prisma';
import { createServiceSchema } from '../schemas/services.schema';

export class ServicesController {
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
