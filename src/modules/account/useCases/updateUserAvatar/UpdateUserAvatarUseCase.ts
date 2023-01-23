import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { deleteFile } from '@utils/file';

interface IRequest {
  user_id: string;
  avatarFile: string;
}

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private readonly usersRepository: IUsersRepository
  ) {};

  async execute({ user_id, avatarFile }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByID(user_id);

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }
    
    user.avatar = avatarFile;

    
    await this.usersRepository.create(user);
  }
}