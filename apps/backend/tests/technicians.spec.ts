import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import request from 'supertest';

import { app } from '../src/app';
import { authConfig } from '../src/configs/auth';
import { prisma } from '../src/infra/database/prisma';

describe('Technicians', () => {
  const adminEmail = 'admin.technicians.test@helpdesk.com';
  const clientEmail = 'client.technicians.test@helpdesk.com';
  const technicianEmail = 'technician.created.test@helpdesk.com';

  let adminToken: string;
  let clientToken: string;

  beforeAll(async () => {
    await prisma.user.deleteMany({
      where: {
        email: {
          in: [adminEmail, clientEmail, technicianEmail],
        },
      },
    });

    const passwordHash = await hash('123456', 8);

    const admin = await prisma.user.create({
      data: {
        name: 'Admin Teste',
        email: adminEmail,
        password: passwordHash,
        role: 'ADMIN',
      },
    });

    const client = await prisma.user.create({
      data: {
        name: 'Cliente Teste',
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
    await prisma.user.deleteMany({
      where: {
        email: {
          in: [adminEmail, clientEmail, technicianEmail],
        },
      },
    });

    await prisma.$disconnect();
  });

  it('should allow admin to create a technician', async () => {
    const response = await request(app)
      .post('/technicians')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Tecnico Criado no Teste',
        email: technicianEmail,
        password: '123456',
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Tecnico Criado no Teste',
        email: technicianEmail,
        role: 'TECHNICIAN',
        mustChangePassword: true,
      })
    );
    expect(response.body.availableHours).toEqual([
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
    ]);
    expect(response.body).not.toHaveProperty('password');
  });

  it('should not allow unauthenticated users to create a technician', async () => {
    const response = await request(app).post('/technicians').send({
      name: 'Tecnico Sem Token',
      email: 'technician.without.token.test@helpdesk.com',
      password: '123456',
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
  });

  it('should not allow client to create a technician', async () => {
    const response = await request(app)
      .post('/technicians')
      .set('Authorization', `Bearer ${clientToken}`)
      .send({
        name: 'Tecnico Cliente Teste',
        email: 'technician.client.test@helpdesk.com',
        password: '123456',
      });

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message');
  });
});
