import { Category } from "@modules/cars/entities/Category";

// DTO => DATA Transfer Object
export interface ICreateCategoryDTO {
  name: string;
  description: string;
};

export interface ICategoriesRepository {
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
  create({ name, description }: ICreateCategoryDTO): void
}