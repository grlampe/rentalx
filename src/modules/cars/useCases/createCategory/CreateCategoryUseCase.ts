import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
};

export class CreateCategoryUseCase {
  constructor(private readonly categoryRepository: ICategoriesRepository) {};

  execute({ name, description }: IRequest): void {
    const categoryAlreadyExists = this.categoryRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error('Category already exists');
    };

    this.categoryRepository.create({ name, description });
  };  
};