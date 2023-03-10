import fs from 'fs';
import { parse } from 'csv-parse';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { inject, injectable } from "tsyringe";

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
export class ImportCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];

      const parseFile = parse({
        delimiter: ','
      });

      stream.pipe(parseFile);

      parseFile.on("data", async (line) => {
        const [name, description] = line;

        categories.push({
          name,
          description,
        });
      })
      .on('end', () => {
        resolve(categories);
        fs.promises.unlink(file.path);
      })
      .on("error", (err) => {
        reject(err);
      });
    })
  };

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.forEach(async (category) => {
      const { name, description } = category;

      const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

      if (!categoryAlreadyExists) {
        this.categoriesRepository.create({ name, description });
      }
    });
  }
};