import { Repository } from "typeorm";
import AppDataSource from "@database/data-source";
import { ICreateUserDTO } from "@modules/account/dtos/ICreateUserDTO";
import { User } from "@modules/account/entities/User";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;
  
  constructor() {
    this.repository = AppDataSource.getRepository(User) 
  }
;

  async create({ name, password, email, driver_license, avatar, id }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({ 
      name, 
      password, 
      email, 
      driver_license,
      avatar,
      id 
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ where: { email: email } });

    return user;
  }

  async findByID(id: string): Promise<User> {
    const user = await this.repository.findOne({ where: { id: id } });

    return user;
  }
}