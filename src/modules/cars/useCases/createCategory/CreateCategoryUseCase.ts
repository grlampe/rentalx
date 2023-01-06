import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
};

export class CreateCategoryUseCase {
  constructor(private readonly categoryRepository: ICategoriesRepository) {};

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoryRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error('Category already exists');
    };

    this.categoryRepository.create({ name, description });
  };  
};