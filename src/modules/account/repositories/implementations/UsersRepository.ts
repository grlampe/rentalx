import { Repository } from "typeorm";
import AppDataSource from "../../../../database/data-source";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;
  
  constructor() {
    this.repository = AppDataSource.getRepository(User) 
  };

  async create({ name, password, email, driver_license }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({ 
      name, 
      password, 
      email, 
      driver_license 
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({where: { email: email}});

    return user;
  }

}