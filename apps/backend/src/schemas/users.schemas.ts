//responsavel por lidar com os dados que a rota aceita
import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(3), //usuario precisa ter o nome string e pelo menos 3 letras
  email: z.string().email(), // valida o email 
  password: z.string().min(6), // aceita senha string e minimo 6 digitos
  role: z.enum(['ADMIN', 'TECHNICIAN', 'CLIENT']), //passa a role 
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
