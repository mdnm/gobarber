import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUsersTokensRepository from '../repositories/fakes/FakeUsersTokensRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokensRepository: FakeUsersTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPasswordService: ResetPasswordService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUsersTokensRepository = new FakeUsersTokensRepository();
    fakeHashProvider = new FakeHashProvider();
    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUsersTokensRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset the password using the token', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Mateus De Nardo',
      email: 'mateusdnm@hotmail.com',
      password: '123456',
    });

    const { token } = await fakeUsersTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPasswordService.execute({ password: '1234567', token });

    await fakeUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('1234567');
  });

  it('should not be able to reset the password using an invalid token', async () => {
    await fakeUsersRepository.create({
      name: 'Mateus De Nardo',
      email: 'mateusdnm@hotmail.com',
      password: '123456',
    });

    expect(resetPasswordService.execute({
      password: '1234567',
      token: 'invalid token',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password using an token of non-existing user ', async () => {
    const { token } = await fakeUsersTokensRepository.generate('non-existing-user');

    expect(resetPasswordService.execute({
      password: '1234567',
      token,
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password using an expired token', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Mateus De Nardo',
      email: 'mateusdnm@hotmail.com',
      password: '123456',
    });

    const { token } = await fakeUsersTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    expect(resetPasswordService.execute({
      password: '1234567',
      token,
    })).rejects.toBeInstanceOf(AppError);
  });
});
