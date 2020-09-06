import { Request, Response } from 'express';

import { container } from 'tsyringe';

import HttpStatusCode from '@shared/enums/HttpStatusCode';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';

class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    await container.resolve(SendForgotPasswordEmailService).execute({
      email,
    });

    return response.status(HttpStatusCode.NO_CONTENT).json();
  }
}

export default ForgotPasswordController;
