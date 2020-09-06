import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import HttpStatusCode from '@shared/enums/HttpStatusCode';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IUsersTokensRepository from '../repositories/IUsersTokensRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) { }

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not found', HttpStatusCode.BAD_REQUEST);
    }

    const userToken = await this.usersTokensRepository.generate(user.id);

    this.mailProvider.sendMail(email, `Reset password token: ${userToken.token}`);
  }
}

export default SendForgotPasswordEmailService;
