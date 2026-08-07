import { Request, Response } from 'express';

import { prisma } from '../infra/database/prisma';
import { createTicketSchema } from '../schemas/ticket.schema';
import { AppError } from '../shared/errors/AppError';

export class TicketsController {
  async create(request: Request, response: Response) {
    const data = createTicketSchema.parse(request.body);

    const client = await prisma.user.findUnique({
      where: {
        id: request.user!.id,
      },
    });

    if (!client || client.role !== 'CLIENT') {
      throw new AppError('Cliente não encontrado.', 404);
    }

    const technician = await prisma.user.findUnique({
      where: {
        id: data.technicianId,
      },
    });

    if (!technician || technician.role !== 'TECHNICIAN') {
      throw new AppError('Técnico não encontrado.', 404);
    }

    const service = await prisma.service.findUnique({
      where: {
        id: data.serviceId,
      },
    });

    if (!service || !service.isActive) {
      throw new AppError('Serviço não encontrado.', 404);
    }

    const ticket = await prisma.ticket.create({
      data: {
        description: data.description,
        clientId: client.id,
        technicianId: technician.id,
        services: {
          create: {
            serviceId: service.id,
            price: service.price,
          },
        },
      },
      include: {
        client: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        technician: {
          select: {
            id: true,
            name: true,
            email: true,
            availableHours: true,
          },
        },
        services: {
          include: {
            service: true,
          },
        },
      },
    });

    return response.status(201).json(ticket);
  }

  async indexByClient(request: Request, response: Response) {
    const tickets = await prisma.ticket.findMany({
      where: {
        clientId: request.user!.id,
      },
      include: {
        technician: {
          select: {
            id: true,
            name: true,
            email: true,
            availableHours: true,
          },
        },
        services: {
          include: {
            service: {
              select: {
                id: true,
                name: true,
                description: true,
                price: true,
                isActive: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return response.json(tickets);
  }

  async indexByTechnician(request: Request, response: Response) {
    const tickets = await prisma.ticket.findMany({
      where: {
        technicianId: request.user!.id,
      },
      include: {
        client: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarURL: true,
          },
        },
        services: {
          include: {
            service: {
              select: {
                id: true,
                name: true,
                description: true,
                price: true,
                isActive: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return response.json(tickets);
  }

  async index(request: Request, response: Response) {
    const tickets = await prisma.ticket.findMany({
      include: {
        client: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarURL: true,
          },
        },
        technician: {
          select: {
            id: true,
            name: true,
            email: true,
            availableHours: true,
            avatarURL: true,
          },
        },
        services: {
          include: {
            service: {
              select: {
                id: true,
                name: true,
                description: true,
                price: true,
                isActive: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return response.json(tickets);
  }
}
