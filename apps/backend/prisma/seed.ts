import { hash } from 'bcryptjs';

import { prisma } from '../src/infra/database/prisma';

async function main() {
  const adminPassword = await hash('admin123', 8);
  const technicianPassword = await hash('tecnico123', 8);

  await prisma.ticketService.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.service.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@helpdesk.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  await prisma.user.createMany({
    data: [
      {
        name: 'Tecnico 1',
        email: 'tecnico1@helpdesk.com',
        password: technicianPassword,
        role: 'TECHNICIAN',
        mustChangePassword: true,
        availableHours: [
          '08:00',
          '09:00',
          '10:00',
          '11:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
        ],
      },
      {
        name: 'Tecnico 2',
        email: 'tecnico2@helpdesk.com',
        password: technicianPassword,
        role: 'TECHNICIAN',
        mustChangePassword: true,
        availableHours: [
          '10:00',
          '11:00',
          '12:00',
          '13:00',
          '16:00',
          '17:00',
          '18:00',
          '19:00',
        ],
      },
      {
        name: 'Tecnico 3',
        email: 'tecnico3@helpdesk.com',
        password: technicianPassword,
        role: 'TECHNICIAN',
        mustChangePassword: true,
        availableHours: [
          '12:00',
          '13:00',
          '14:00',
          '15:00',
          '18:00',
          '19:00',
          '20:00',
          '21:00',
        ],
      },
    ],
  });

  await prisma.service.createMany({
    data: [
      {
        name: 'Instalacao de software',
        description: 'Instalacao e configuracao de softwares.',
        price: 120,
      },
      {
        name: 'Instalacao de hardware',
        description: 'Instalacao e atualizacao de hardwares.',
        price: 180,
      },
      {
        name: 'Remocao de virus',
        description: 'Diagnostico e remocao de virus do sistema.',
        price: 150,
      },
      {
        name: 'Suporte a impressoras',
        description: 'Configuracao e suporte tecnico para impressoras.',
        price: 90,
      },
      {
        name: 'Suporte a perifericos',
        description:
          'Suporte para mouse, teclado, webcam e outros perifericos.',
        price: 80,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
