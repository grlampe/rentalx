import { getRepository, Repository } from "typeorm";
import { Category } from "../../entities/Category";
import dataSource from "../../../../database/data-source";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";

export class CategoriesRepository implements ICategoriesRepository {
  
  private repository: Repository<Category>;
  
  // DECLARADO COMO PRIVADO
  constructor() {
    this.repository = dataSource.getRepository(Category) 
  };

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      description,
      name,  
    })

    await this.repository.save(category);
  };

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  };

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({ where: { name: name }});

    return category;
  };
};