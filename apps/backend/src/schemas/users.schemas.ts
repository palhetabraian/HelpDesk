//responsavel por lidar com os dados que a rota aceita
import { z } from 'zod';

// schema para criar perfil
export const createUserSchema = z.object({
  name: z.string().min(3), //usuario precisa ter o nome string e pelo menos 3 letras
  email: z.string().email(), // valida o email
  password: z.string().min(6), // aceita senha string e minimo 6 digitos
});

// schema para atualizar perfil
export const updateProfileSchema = z.object({
  name: z.string().min(3).optional(),
  email: z.email().optional(),
});

//passando como tipagem
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

