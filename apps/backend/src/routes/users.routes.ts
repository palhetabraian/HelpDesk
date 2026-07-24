// rota responsavel pelos usuarios
import { Router } from 'express';
import { prisma } from '../lib/prisma';

export const usersRoutes = Router();

//rota responsavel por usuarios
usersRoutes.get('/', async (request, response) => {
  const users = await prisma.user.findMany(); //busca todos os registro da tabela

  return response.json(users); // retorna os registos
});
