import { Category } from "../model/Category";

// DTO => DATA Transfer Object
export interface ICreateCategoryDTO {
  name: string;
  description: string;
};

export interface ICategoriesRepository {
  findByName(name: string): Category;
  list(): Category[];
  create({ name, description }: ICreateCategoryDTO): void
}