import { Request, Response } from 'express';

import { container } from 'tsyringe';

import HttpStatusCode from '@shared/enums/HttpStatusCode';
import ReseResetPasswordService from '@modules/users/services/ResetPasswordService';

class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;

    await container.resolve(ReseResetPasswordService).execute({
      token,
      password,
    });

    return response.status(HttpStatusCode.NO_CONTENT).json();
  }
}

export default ResetPasswordController;
