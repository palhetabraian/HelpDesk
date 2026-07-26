import { SignOptions } from 'jsonwebtoken';

// configuração do token do usuário
type AuthConfig = {
  jwt: {
    secret: string;
    expiresIn: SignOptions['expiresIn'];
  };
};

export const authConfig: AuthConfig = {
  jwt: {
    secret: process.env.JWT_SECRET || 'helpdesk-secret',
    expiresIn: '1d',
  },
};
