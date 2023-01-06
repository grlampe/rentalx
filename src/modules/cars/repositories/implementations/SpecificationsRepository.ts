import { Specification } from "../../entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";

export class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[];

  private static INSTANCE: SpecificationsRepository;
  
  private constructor() {
    this.specifications = [];
  };

  public static getInstance(): SpecificationsRepository {
    if (!SpecificationsRepository.INSTANCE) {
      SpecificationsRepository.INSTANCE = new SpecificationsRepository();
    }

    return SpecificationsRepository.INSTANCE;
  }

  create({ name, description }: ICreateSpecificationDTO): void {
    const newSpecification = new Specification();

    Object.assign(newSpecification, { 
      name, 
      description,
      createdAt: new Date(),
    });

    this.specifications.push(newSpecification);
  };

  list(): Specification[] {
    return this.specifications;
  };

  findByName(name: string): Specification {
    return this.specifications.find(specification => specification.name === name);
  };
};