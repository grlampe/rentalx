import "reflect-metadata";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { inject, injectable } from "tsyringe";
import { AppError } from "@errors/AppError";

interface IRequest {
  name: string;
  description: string;
};

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private readonly categoryRepository: ICategoriesRepository
  ) {};

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoryRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new AppError('Category already exists');
    };

    this.categoryRepository.create({ name, description });
  };  
};