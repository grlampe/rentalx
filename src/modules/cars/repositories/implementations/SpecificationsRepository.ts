import { Repository } from "typeorm";
import { Specification } from "../../entities/Specification";
import AppDataSource from "../../../../database/data-source";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";

export class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = AppDataSource.getRepository(Specification) 
  };

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      description,
      name,
    });

    await this.repository.save(specification);
  };

  async list(): Promise<Specification[]> {
    const specifications = await this.repository.find();
    return specifications;
  };

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ where: { name: name }});

    return specification;
  };
};