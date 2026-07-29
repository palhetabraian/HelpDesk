//Guarda a regra de negocios dos tecnicos
import { Request, Response } from 'express';
import { hash } from 'bcryptjs';

import { prisma } from '../infra/database/prisma';
import {
  createTechnicianSchema,
  updateTechnicianSchema,
} from '../schemas/technicians.schemas';
import { AppError } from '../shared/errors/AppError';

//horarios que os tecnicos vao estar disponiveis
const DEFAULT_TECHNICIAN_AVAILABLE_HOURS = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
];

//class responsavel por criar um tecnico
export class TechniciansController {
  //listando conta de tecnicos
  async index(request: Request, response: Response) {
    const technicians = await prisma.user.findMany({
      where: {
        role: 'TECHNICIAN',
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatarURL: true,
        availableHours: true,
        mustChangePassword: true,
        createdAt: true,
        updatedAt: true,
      },
      //organiza em ordem asc
      orderBy: {
        name: 'asc',
      },
    });

    return response.json(technicians);
  }

  async create(request: Request, response: Response) {
    const data = createTechnicianSchema.parse(request.body); //analisa os dados vindo do body

    const userWithSameEmail = await prisma.user.findUnique({
      //pega o primeiro email na tabela
      where: {
        email: data.email,
      },
    });

    //verificando se o email ja existe
    if (userWithSameEmail) {
      throw new AppError('Já existe um usuário com este e-mail', 409);
    }

    const passwordHash = await hash(data.password, 8); // criptografando a senha

    //criando o tecnico na tabela
    const technician = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: passwordHash,
        role: 'TECHNICIAN',
        availableHours: DEFAULT_TECHNICIAN_AVAILABLE_HOURS,
        mustChangePassword: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatarURL: true,
        availableHours: true,
        mustChangePassword: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return response.status(201).json(technician);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params; //recupera id
    const data = updateTechnicianSchema.parse(request.body); // recuperando os dados do body

    const technician = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    //validando o tecnico
    if (!technician || technician.role !== 'TECHNICIAN') {
      throw new AppError('Técnico não encontrado.', 404);
    }

    //pegando o email no banco de dados
    if (data.email) {
      const userWithSameEmail = await prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

      if (userWithSameEmail && userWithSameEmail.id !== id) {
        throw new AppError('Já existe um usuário com este e-mail.', 409);
      }
    }

    const updatedTechnician = await prisma.user.update({
      where: {
        id,
      },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatarURL: true,
        availableHours: true,
        mustChangePassword: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return response.json(updatedTechnician);
  }
}
