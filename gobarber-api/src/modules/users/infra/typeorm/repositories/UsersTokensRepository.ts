import { getRepository, Repository } from 'typeorm';

import IUsersTokensRepository from '@modules/users/repositories/IUsersTokensRepository';

import UserToken from '../entities/UserToken';

class UsersTokensRepository implements IUsersTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({ user_id });

    await this.ormRepository.save(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    return this.ormRepository.findOne({
      where: { token },
    });
  }
}

export default UsersTokensRepository;
