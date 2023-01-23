import { AppError } from "@errors/AppError";
import { ICreateUserDTO } from "@modules/account/dtos/ICreateUserDTO";
import { UserRepositoryMock } from "@modules/account/repositories/mocks/UserRepositoryMock";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";


let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryMock: UserRepositoryMock;

describe('Authenticate User', () => {

  beforeAll(() => {
    userRepositoryMock = new UserRepositoryMock();
    authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryMock);
  });

  it('Should be able to authenticate a user and Give a Token', async () => {
    const user: ICreateUserDTO = {
      name: 'User Test', 
      password: 'test',
      email: 'test@example.com', 
      driver_license: 'test-license',
    };

    await userRepositoryMock.create(user);

    const token = await authenticateUserUseCase.execute({ 
      email: user.email, 
      password: user.password 
    });

    expect(token).toBeDefined();
    expect(token).toHaveProperty('token');
    expect(token.user.name).toEqual(user.name);
    expect(token.user.email).toEqual(user.email);
  });

  it('Should not be able to authenticate a nonexistent user', async () => {

    expect(async () => {
      await authenticateUserUseCase.execute({ 
        email: 'test email@email.com', password: 'test password'
      });
    }).rejects.toBeInstanceOf(AppError)
  });

  it('Should not be able to authenticate with a incorrect password', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "9999",
        email: "user@user.com",
        password: "1234",
        name: "User Test Error",
      };

      await userRepositoryMock.create(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "incorret"
      });
    }).rejects.toBeInstanceOf(AppError);
  });

});