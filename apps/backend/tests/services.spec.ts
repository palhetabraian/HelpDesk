import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import request from 'supertest';

import { app } from '../src/app';
import { authConfig } from '../src/configs/auth';
import { prisma } from '../src/infra/database/prisma';

describe('Services', () => {
  const adminEmail = 'admin.services.test@helpdesk.com';
  const clientEmail = 'client.services.test@helpdesk.com';
  const serviceName = 'Servico Criado no Teste';
  const serviceToDeactivateName = 'Servico para Desativar no Teste';

  let adminToken: string;
  let clientToken: string;

  beforeAll(async () => {
    await prisma.service.deleteMany({
      where: {
        name: {
          in: [serviceName, serviceToDeactivateName],
        },
      },
    });

    await prisma.user.deleteMany({
      where: {
        email: {
          in: [adminEmail, clientEmail],
        },
      },
    });

    const passwordHash = await hash('123456', 8);

    const admin = await prisma.user.create({
      data: {
        name: 'Admin Servicos Teste',
        email: adminEmail,
        password: passwordHash,
        role: 'ADMIN',
      },
    });

    const client = await prisma.user.create({
      data: {
        name: 'Cliente Servicos Teste',
        email: clientEmail,
        password: passwordHash,
        role: 'CLIENT',
      },
    });

    adminToken = sign({ role: admin.role }, authConfig.jwt.secret, {
      subject: admin.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    clientToken = sign({ role: client.role }, authConfig.jwt.secret, {
      subject: client.id,
      expiresIn: authConfig.jwt.expiresIn,
    });
  });

  afterAll(async () => {
    await prisma.service.deleteMany({
      where: {
        name: {
          in: [serviceName, serviceToDeactivateName],
        },
      },
    });

    await prisma.user.deleteMany({
      where: {
        email: {
          in: [adminEmail, clientEmail],
        },
      },
    });

    await prisma.$disconnect();
  });

  it('should allow admin to create a service', async () => {
    const response = await request(app)
      .post('/services')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: serviceName,
        description: 'Servico criado durante teste automatizado',
        price: 150,
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: serviceName,
        description: 'Servico criado durante teste automatizado',
        isActive: true,
      })
    );
  });

  it('should not allow unauthenticated users to create a service', async () => {
    const response = await request(app).post('/services').send({
      name: 'Servico Sem Token',
      description: 'Servico sem autenticacao',
      price: 100,
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
  });

  it('should not allow client to create a service', async () => {
    const response = await request(app)
      .post('/services')
      .set('Authorization', `Bearer ${clientToken}`)
      .send({
        name: 'Servico Cliente Teste',
        description: 'Servico criado por cliente',
        price: 100,
      });

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message');
  });

  it('should list active services for authenticated users', async () => {
    await prisma.service.create({
      data: {
        name: serviceToDeactivateName,
        description: 'Servico ativo para listagem',
        price: 200,
      },
    });

    const response = await request(app)
      .get('/services')
      .set('Authorization', `Bearer ${clientToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: serviceToDeactivateName,
          isActive: true,
        }),
      ])
    );
  });

  it('should allow admin to deactivate a service', async () => {
    const service = await prisma.service.findFirstOrThrow({
      where: {
        name: serviceToDeactivateName,
      },
    });

    const response = await request(app)
      .patch(`/services/${service.id}/deactivate`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: service.id,
        name: serviceToDeactivateName,
        isActive: false,
      })
    );
  });

  it('should not list inactive services', async () => {
    const response = await request(app)
      .get('/services')
      .set('Authorization', `Bearer ${clientToken}`);

    expect(response.status).toBe(200);
    expect(response.body).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: serviceToDeactivateName,
        }),
      ])
    );
  });
});
