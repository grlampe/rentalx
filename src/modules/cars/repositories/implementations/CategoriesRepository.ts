import { Category } from "../../model/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";

// UTILIZADO PADRÃO SINGLETON PORQUE NESSE CASO, USAMOS UM ARRAY E CADA INSTANCIA DO REPOSITORIO GERA UM ARRAY VAZIO

export class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];
  
  // INSTANCIA
  private static INSTANCE: CategoriesRepository;
  
  // DECLARADO COMO PRIVADO
  private constructor() {
    this.categories = [];
  };

  // GERA OU RETORNA A INSTANCIA
  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }

    return CategoriesRepository.INSTANCE;
  }

  create({ name, description }: ICreateCategoryDTO): void {
    const newCategory = new Category();

    Object.assign(newCategory, { 
      name, 
      description,
      createdAt: new Date(),
    });

    this.categories.push(newCategory);
  };

  list(): Category[] {
    return this.categories;
  };

  findByName(name: string): Category {
    return this.categories.find(category => category.name === name);
  };
};