import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUserService: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    await fakeUsersRepository.create({
      name: 'Mateus De Nardo',
      email: 'mateusdnm@hotmail.com',
      password: '123456',
    });

    const response = await authenticateUserService.execute({
      email: 'mateusdnm@hotmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
  });

  it('should not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'Mateus De Nardo',
      email: 'mateusdnm@hotmail.com',
      password: '123456',
    });

    expect(authenticateUserService.execute({
      email: 'mateusdnm@hotmail.com',
      password: '1234567',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with non existing user', async () => {
    expect(authenticateUserService.execute({
      email: 'mateusdnm@hotmail.com',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError);
  });
});
