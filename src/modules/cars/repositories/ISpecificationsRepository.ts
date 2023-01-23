import { Specification } from "@modules/cars/entities/Specification";

// DTO => DATA Transfer Object
export interface ICreateSpecificationDTO {
  name: string;
  description: string;
};

export interface ISpecificationsRepository {
  findByName(name: string): Promise<Specification>;
  list(): Promise<Specification[]>;
  create({ name, description }: ICreateSpecificationDTO): void
}