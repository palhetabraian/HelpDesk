import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import request from 'supertest';

import { app } from '../src/app';
import { authConfig } from '../src/configs/auth';
import { prisma } from '../src/infra/database/prisma';

describe('Tickets', () => {
  const adminEmail = 'admin.tickets.test@helpdesk.com';
  const clientEmail = 'client.tickets.test@helpdesk.com';
  const technicianEmail = 'technician.tickets.test@helpdesk.com';
  const primaryServiceName = 'Servico Principal do Chamado Teste';
  const additionalServiceName = 'Servico Adicional do Chamado Teste';

  let adminToken: string;
  let clientToken: string;
  let technicianToken: string;
  let clientId: string;
  let technicianId: string;
  let primaryServiceId: string;
  let additionalServiceId: string;
  let ticketId: string;

  async function cleanupTestData() {
    const users = await prisma.user.findMany({
      where: {
        email: {
          in: [adminEmail, clientEmail, technicianEmail],
        },
      },
      select: {
        id: true,
      },
    });

    const userIds = users.map((user) => user.id);

    if (userIds.length > 0) {
      await prisma.ticket.deleteMany({
        where: {
          OR: [
            {
              clientId: {
                in: userIds,
              },
            },
            {
              technicianId: {
                in: userIds,
              },
            },
          ],
        },
      });
    }

    await prisma.service.deleteMany({
      where: {
        name: {
          in: [primaryServiceName, additionalServiceName],
        },
      },
    });

    await prisma.user.deleteMany({
      where: {
        email: {
          in: [adminEmail, clientEmail, technicianEmail],
        },
      },
    });
  }

  beforeAll(async () => {
    await cleanupTestData();

    const passwordHash = await hash('123456', 8);

    const admin = await prisma.user.create({
      data: {
        name: 'Admin Chamados Teste',
        email: adminEmail,
        password: passwordHash,
        role: 'ADMIN',
      },
    });

    const client = await prisma.user.create({
      data: {
        name: 'Cliente Chamados Teste',
        email: clientEmail,
        password: passwordHash,
        role: 'CLIENT',
      },
    });

    const technician = await prisma.user.create({
      data: {
        name: 'Tecnico Chamados Teste',
        email: technicianEmail,
        password: passwordHash,
        role: 'TECHNICIAN',
        availableHours: ['08:00', '09:00'],
        mustChangePassword: false,
      },
    });

    const primaryService = await prisma.service.create({
      data: {
        name: primaryServiceName,
        description: 'Servico usado na criacao do chamado',
        price: 100,
      },
    });

    const additionalService = await prisma.service.create({
      data: {
        name: additionalServiceName,
        description: 'Servico adicional usado no chamado',
        price: 50,
      },
    });

    clientId = client.id;
    technicianId = technician.id;
    primaryServiceId = primaryService.id;
    additionalServiceId = additionalService.id;

    adminToken = sign({ role: admin.role }, authConfig.jwt.secret, {
      subject: admin.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    clientToken = sign({ role: client.role }, authConfig.jwt.secret, {
      subject: client.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    technicianToken = sign({ role: technician.role }, authConfig.jwt.secret, {
      subject: technician.id,
      expiresIn: authConfig.jwt.expiresIn,
    });
  });

  afterAll(async () => {
    await cleanupTestData();

    await prisma.$disconnect();
  });

  it('should allow client to create a ticket', async () => {
    const response = await request(app)
      .post('/tickets')
      .set('Authorization', `Bearer ${clientToken}`)
      .send({
        description: 'Meu computador nao esta ligando corretamente',
        technicianId,
        serviceId: primaryServiceId,
      });

    ticketId = response.body.id;

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        description: 'Meu computador nao esta ligando corretamente',
        status: 'ABERTO',
        clientId,
        technicianId,
      })
    );
    expect(response.body.services).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          serviceId: primaryServiceId,
        }),
      ])
    );
  });

  it('should not allow technician to create a ticket', async () => {
    const response = await request(app)
      .post('/tickets')
      .set('Authorization', `Bearer ${technicianToken}`)
      .send({
        description: 'Chamado criado por tecnico nao deve ser permitido',
        technicianId,
        serviceId: primaryServiceId,
      });

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message');
  });

  it('should list tickets from authenticated client', async () => {
    const response = await request(app)
      .get('/tickets/me')
      .set('Authorization', `Bearer ${clientToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: ticketId,
          description: 'Meu computador nao esta ligando corretamente',
          status: 'ABERTO',
        }),
      ])
    );
  });

  it('should list tickets assigned to authenticated technician', async () => {
    const response = await request(app)
      .get('/tickets/technician')
      .set('Authorization', `Bearer ${technicianToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: ticketId,
          description: 'Meu computador nao esta ligando corretamente',
          status: 'ABERTO',
        }),
      ])
    );
  });

  it('should list all tickets for admin', async () => {
    const response = await request(app)
      .get('/tickets')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: ticketId,
          description: 'Meu computador nao esta ligando corretamente',
          status: 'ABERTO',
        }),
      ])
    );
  });

  it('should allow technician to add a service to assigned ticket', async () => {
    const response = await request(app)
      .post(`/tickets/${ticketId}/services`)
      .set('Authorization', `Bearer ${technicianToken}`)
      .send({
        serviceId: additionalServiceId,
      });

    expect(response.status).toBe(200);
    expect(response.body.services).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          serviceId: primaryServiceId,
        }),
        expect.objectContaining({
          serviceId: additionalServiceId,
        }),
      ])
    );
  });

  it('should allow technician to update assigned ticket status', async () => {
    const response = await request(app)
      .patch(`/tickets/${ticketId}/status`)
      .set('Authorization', `Bearer ${technicianToken}`)
      .send({
        status: 'EM_ATENDIMENTO',
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: ticketId,
        status: 'EM_ATENDIMENTO',
      })
    );
  });

  it('should not allow client to update ticket status', async () => {
    const response = await request(app)
      .patch(`/tickets/${ticketId}/status`)
      .set('Authorization', `Bearer ${clientToken}`)
      .send({
        status: 'ENCERRADO',
      });

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message');
  });
});
