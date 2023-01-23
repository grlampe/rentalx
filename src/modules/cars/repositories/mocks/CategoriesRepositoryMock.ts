import { Category } from "@modules/cars/entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "@modules/cars/repositories/ICategoriesRepository";


export class CategoriesRepositoryMock implements ICategoriesRepository {
  categories: Category[] = [];

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find(c => c.name === name);

    return category;
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category();

    Object.assign(category, { name, description });

    this.categories.push(category);
  }

}