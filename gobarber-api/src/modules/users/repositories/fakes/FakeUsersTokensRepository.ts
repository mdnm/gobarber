import { v4 } from 'uuid';

import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

import IUsersTokensRepository from '../IUsersTokensRepository';

class FakeUsersTokensRepository implements IUsersTokensRepository {
  private userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: v4(),
      token: v4(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    return this.userTokens.find((userToken) => userToken.token === token);
  }
}

export default FakeUsersTokensRepository;
