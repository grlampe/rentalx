import { ICreateUserDTO } from "@modules/account/dtos/ICreateUserDTO";
import { User } from "@modules/account/entities/User";

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findByID(id: string): Promise<User>;
}