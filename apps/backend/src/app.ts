import express from 'express';

import { prisma } from './lib/prisma';

// cria aplicacao backend
export const app = express();

//permite request e response receber json
app.use(express.json());

//rota para testar aplicacao
app.get('/health', (request, response) => {
  return response.json({
    status: 'ok',
    message: 'HelpDesk API is running',
  });
});

app.get('/users', async (request, response) => {
  const users = await prisma.user.findMany(); // busca diversos registros da tabela usuario

  return response.json(users); // mostra os registros do usuario
});
