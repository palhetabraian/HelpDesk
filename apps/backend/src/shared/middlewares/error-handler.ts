import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

import { AppError } from '../errors/AppError';

type JsonSyntaxError = SyntaxError & {
  status?: number;
};

export const errorHandler: ErrorRequestHandler = (
  error,
  request,
  response,
  next
) => {
  if (error instanceof AppError) {
    response.status(error.statusCode).json({
      message: error.message,
    });
    return;
  }

  if (error instanceof ZodError) {
    response.status(400).json({
      message: 'Erro de validacao.',
      issues: error.format(),
    });
    return;
  }

  if (error instanceof SyntaxError && (error as JsonSyntaxError).status === 400) {
    response.status(400).json({
      message: 'JSON invalido.',
    });
    return;
  }

  response.status(500).json({
    message: 'Erro interno do servidor.',
  });
};
