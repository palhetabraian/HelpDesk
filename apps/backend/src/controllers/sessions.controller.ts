import { Request, Response } from 'express';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { authConfig } from '../configs/auth';
import { prisma } from '../infra/database/prisma';
import { createSessionsSchema } from '../schemas/sessions.schemas';
import { AppError } from '../shared/errors/AppError';

//controller responsavel pela sessao de usuario
export class SessionController {
  async create(request: Request, response: Response) {
    //verifica os dados vindo do body
    const data = createSessionsSchema.parse(request.body);

    //pegando o usuario do banco de dados
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    //tratamento de email ou senha errada
    if (!user) {
      throw new AppError('E-mail ou senha inválidos', 401);
    }

    //comparando a senha do usuario com a do banco de dados existente
    const passwordMatched = await compare(data.password, user.password);

    //tratamento de erro responsavel pela senha existente
    if (!passwordMatched) {
      throw new AppError('E-mail ou senha inválidos', 401);
    }

    //criando o token apos o login
    const token = sign(
      { // informacoes que vai ficar guardada dentro do token
        role: user.role,
      },
      authConfig.jwt.secret,
      { //configuracao do token, o que ele vai receber
        subject: user.id,
        expiresIn: authConfig.jwt.expiresIn,
      }
    );

    //removendo a senha para nao devolver no front-end
    const { password, ...userWithoutPassword } = user;

    return response.json({
      token,
      user: userWithoutPassword,
    });
  }
}
