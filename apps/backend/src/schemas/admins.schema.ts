import { z } from 'zod';

export const createAdminSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'O nome deve ter pelo menos 3 caracteres.'),
  email: z.email('Informe um e-mail válido.'),
  password: z
    .string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres.'),
});

export const updateAdminSchema = createAdminSchema.omit({
  password: true,
});
