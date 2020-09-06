import { getRepository, Repository } from 'typeorm';

import IUserRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '../entities/User';

class UsersRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.ormRepository.findOne({
      where: { email },
    });
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async create(userDTO: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userDTO);

    await this.save(user);

    return user;
  }
}

export default UsersRepository;
