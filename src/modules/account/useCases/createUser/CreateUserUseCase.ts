import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { AppError } from "@errors/AppError"
import { ICreateUserDTO } from "@modules/account/dtos/ICreateUserDTO"
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private readonly usersRepository: IUsersRepository
  ) {};

  async execute({ name, password, email, driver_license }: ICreateUserDTO): Promise<void> {

    const emailAlreadyExists = await this.usersRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new AppError("User already exists");
    }
    
    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      name, 
      password: passwordHash, 
      email, 
      driver_license
    });
  }
}