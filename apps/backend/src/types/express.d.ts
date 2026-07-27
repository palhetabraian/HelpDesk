//arquivo responsavel pela tipagem do usuario autenticado

declare namespace Express {
  export interface Request {
    user?: {
      id: string;
      role: string;
    };
  }
}
