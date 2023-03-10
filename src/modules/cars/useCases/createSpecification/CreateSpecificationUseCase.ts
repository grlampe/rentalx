import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { inject, injectable } from "tsyringe";
import { AppError } from "@errors/AppError";

interface IRequest {
  name: string;
  description: string;
};

@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private readonly specificationsRepository: ISpecificationsRepository
  ) {};

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExists = await this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError('Specification already exists');
    };

    this.specificationsRepository.create({ name, description });
  };  
};