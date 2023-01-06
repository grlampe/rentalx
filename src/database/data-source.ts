import { DataSource } from "typeorm"
import { Category } from "../modules/cars/entities/Category";
import { CreateCategories1673008287995 } from './migrations/1673008287995-CreateCategories'


const AppDataSource = new DataSource({
  type: "postgres",
  host: "database_ignite",
  port: 5432,
  username: "docker",
  password: "ignite",
  database: "rentalx",
  entities: [Category],
  migrations: [CreateCategories1673008287995],
})

AppDataSource.initialize()
  .then(() => {
      console.log("Initialized");
  })
  .catch((error) => console.log(error))

export default AppDataSource