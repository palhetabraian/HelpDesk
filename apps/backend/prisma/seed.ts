//arquivo responsavel por colocar dados iniciais no banco de dados
import { hash } from 'bcryptjs';

import { prisma } from '../src/infra/database/prisma';

//seed responsavel por colocar o usuario admin no banco
async function main() {
  const passwordHash = await hash('123456', 8);

  await prisma.user.upsert({ //funcao que procura se ja existe, se existir, atualizar, se nao existir, criar.
    where: {
      email: 'admin@helpdesk.com',
    },
    update: {},
    create: {
      name: 'Administrador',
      email: 'admin@helpdesk.com',
      password: passwordHash,
      role: 'ADMIN',
      avatarURL: null,
      availableHours: [],
      mustChangePassword: false,
    },
  });

  console.log('Seed executado com sucesso.');
}

main()
  .catch((error) => {
    console.log('Erro ao executar seed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
