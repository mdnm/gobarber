import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatarService: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to update the user avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Mateus De Nardo',
      email: 'mateusdnm@hotmail.com',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'teste.png',
    });

    expect(user.avatar).toBe('teste.png');
  });

  it('should not be able to update not existing user avatar', async () => {
    expect(updateUserAvatarService.execute({
      user_id: '123',
      avatarFilename: 'teste.png',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'Mateus De Nardo',
      email: 'mateusdnm@hotmail.com',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'teste.png',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'teste2.png',
    });

    expect(deleteFile).toHaveBeenCalledWith('teste.png');

    expect(user.avatar).toBe('teste2.png');
  });
});
