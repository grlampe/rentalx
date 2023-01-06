import { DataSource } from "typeorm"
import { Category } from "../modules/cars/entities/Category";
import { CreateCategories1673008287995 } from './migrations/1673008287995-CreateCategories'


const AppDataSource = new DataSource({
  type: "postgres",
  host: "database",
  port: 5432,
  username: "docker",
  password: "ignite",
  database: "rentalx",
  synchronize: false,
  logging: false,
  entities: [Category],
  migrations: [CreateCategories1673008287995],
  subscribers: [],
})

export function createConnection(host = "database"): Promise<DataSource> {
  return AppDataSource.setOptions({ host }).initialize();
}

export default AppDataSource