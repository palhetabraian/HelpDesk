import { Request, Response } from 'express';

export class AuthController {
  async me(request: Request, response: Response) {
    return response.json({
      user: request.user,
    });
  }
}
