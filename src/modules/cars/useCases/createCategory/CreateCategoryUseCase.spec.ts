import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { CategoriesRepositoryMock } from "./../../repositories/mocks/CategoriesRepositoryMock"
import "reflect-metadata";
import { AppError } from "../../../../errors/AppError";


let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryMock: CategoriesRepositoryMock;

describe('Create Category', () => {
  beforeAll(() => {
    categoriesRepositoryMock = new CategoriesRepositoryMock();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryMock);
  });  

  it('Should be able to create a new Category', async () => {
    const category = {
      name: 'Category test',
      description: 'Category test description'
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    });

    const user = await categoriesRepositoryMock.findByName('Category test');

    expect(user).toBeDefined();
    expect(user.name).toEqual(category.name);
    expect(user.description).toEqual(category.description);
  });

  it('Should not be able to create a new Category with the same name', async () => {

    expect(async () => {
      const category = {
        name: 'Category test',
        description: 'Category test description'
      };
  
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description
      });

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description
      })

    }).rejects.toBeInstanceOf(AppError)
  }); 

}); 