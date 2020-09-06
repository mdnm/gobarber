import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUsersTokensRepository from '../repositories/fakes/FakeUsersTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokensRepository: FakeUsersTokensRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUsersTokensRepository = new FakeUsersTokensRepository();
    fakeMailProvider = new FakeMailProvider();
    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeUsersTokensRepository,
      fakeMailProvider,
    );
  });

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'Mateus De Nardo',
      email: 'mateusdnm@hotmail.com',
      password: '123456',
    });

    await sendForgotPasswordEmailService.execute({ email: 'mateusdnm@hotmail.com' });

    expect(sendMail).toHaveBeenCalledTimes(1);
  });

  it('should not be able to recover a non-existing user password', () => {
    expect(sendForgotPasswordEmailService.execute({
      email: 'mateusdnm@hotmail.com',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUsersTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'Mateus De Nardo',
      email: 'mateusdnm@hotmail.com',
      password: '123456',
    });

    await sendForgotPasswordEmailService.execute({ email: 'mateusdnm@hotmail.com' });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
