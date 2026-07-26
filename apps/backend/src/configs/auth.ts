//configuracao do token de usuario
export const authConfig = {
  jwt: {
    secret: process.env.JWT_SECRET || 'helpdesk-secret',
    expiresIn: '1d',
  },
};
