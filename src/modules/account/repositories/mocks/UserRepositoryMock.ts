import { hash } from "bcryptjs";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class UserRepositoryMock implements IUsersRepository {
  users: User[] = [];

  async create({name, password, email, driver_license}: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      name, 
      password: await hash(password, 8), 
      email, 
      driver_license
    });

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email);
  }

  async findByID(id: string): Promise<User> {
    return this.users.find(user => user.id === id);
  }

}