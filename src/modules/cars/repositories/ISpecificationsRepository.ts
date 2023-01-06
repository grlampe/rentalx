import { Specification } from "../entities/Specification";

// DTO => DATA Transfer Object
export interface ICreateSpecificationDTO {
  name: string;
  description: string;
};

export interface ISpecificationsRepository {
  findByName(name: string): Specification;
  list(): Specification[];
  create({ name, description }: ICreateSpecificationDTO): void
}