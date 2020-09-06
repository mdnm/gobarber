import { v4 } from 'uuid';

import IUserRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '@modules/users/infra/typeorm/entities/User';

class AppointmentsRepository implements IUserRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex((findUser) => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }

  public async create(userDTO: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: v4() }, userDTO);

    this.users.push(user);

    return user;
  }
}

export default AppointmentsRepository;
