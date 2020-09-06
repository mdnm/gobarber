import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'Mateus De Nardo',
      email: 'mateusdnm@hotmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Mateus De Nardo');
  });

  it('should not be able to create a user with existing email', async () => {
    await createUserService.execute({
      name: 'Mateus De Nardo',
      email: 'mateusdnm@hotmail.com',
      password: '123456',
    });

    expect(createUserService.execute({
      name: 'Nardo De Mateus',
      email: 'mateusdnm@hotmail.com',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError);
  });
});
