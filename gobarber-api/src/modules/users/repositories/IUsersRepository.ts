import User from '../infra/typeorm/entities/User';

import ICreateUserDTO from '../dtos/ICreateUserDTO';

interface IUserRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(userDTO: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}

export default IUserRepository;
