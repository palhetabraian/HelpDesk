import { hash } from 'bcryptjs';
import request from 'supertest';

import { app } from '../src/app';
import { prisma } from '../src/infra/database/prisma';

describe('Sessions', () => {
  const userEmail = 'admin.sessions.test@helpdesk.com';
  const userPassword = 'admin123';

  beforeAll(async () => {
    await prisma.user.deleteMany({
      where: {
        email: userEmail,
      },
    });

    const passwordHash = await hash(userPassword, 8);

    await prisma.user.create({
      data: {
        name: 'Admin Teste',
        email: userEmail,
        password: passwordHash,
        role: 'ADMIN',
      },
    });
  });

  afterAll(async () => {
    await prisma.user.deleteMany({
      where: {
        email: userEmail,
      },
    });

    await prisma.$disconnect();
  });

  it('should authenticate with valid credentials', async () => {
    const response = await request(app).post('/sessions').send({
      email: userEmail,
      password: userPassword,
    });

    expect(response.status).toBe(200);
    expect(response.body.token).toEqual(expect.any(String));
    expect(response.body.user).toEqual(
      expect.objectContaining({
        email: userEmail,
        role: 'ADMIN',
      })
    );
    expect(response.body.user).not.toHaveProperty('password');
  });

  it('should not authenticate with invalid credentials', async () => {
    const response = await request(app).post('/sessions').send({
      email: userEmail,
      password: 'wrong-password',
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
  });
});
