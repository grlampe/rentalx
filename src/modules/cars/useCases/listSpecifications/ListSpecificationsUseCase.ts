import { Specification } from "../../model/Specification";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

export class ListSpecificationsUseCase {
  constructor(private specificationsRepository: ISpecificationsRepository) {};

  execute(): Specification[] {
    const specifications = this.specificationsRepository.list();

    return specifications;
  };     
}