import { DataSource } from "typeorm"
import { Category } from "../modules/cars/entities/Category";
import { Specification } from "../modules/cars/entities/Specification";
import { CreateCategories1673008287995 } from './migrations/1673008287995-CreateCategories'
import { CreateSpecifications1673437984780 } from "./migrations/1673437984780-CreateSpecifications";


const AppDataSource = new DataSource({
  type: "postgres",
  host: "database_ignite",
  port: 5432,
  username: "docker",
  password: "ignite",
  database: "rentalx",
  entities: [Category, Specification],
  migrations: [CreateCategories1673008287995, CreateSpecifications1673437984780],
})

AppDataSource.initialize()
  .then(() => {
      console.log("Initialized");
  })
  .catch((error) => console.log(error))

export default AppDataSource