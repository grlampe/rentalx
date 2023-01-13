import { DataSource } from "typeorm"
import { User } from "../modules/account/entities/User";
import { Category } from "../modules/cars/entities/Category";
import { Specification } from "../modules/cars/entities/Specification";
import { CreateCategories1673008287995 } from './migrations/1673008287995-CreateCategories'
import { CreateSpecifications1673437984780 } from "./migrations/1673437984780-CreateSpecifications";
import { CreateUsers1673457397613 } from "./migrations/1673457397613-CreateUsers";
import { AlterUserDeleteUsername1673460295780 } from "./migrations/1673460295780-AlterUserDeleteUsername";
import { AlterUserAddAvatarColumn1673564546909 } from "./migrations/1673564546909-AlterUserAddAvatarColumn";


const AppDataSource = new DataSource({
  type: "postgres",
  host: "database_ignite",
  port: 5432,
  username: "docker",
  password: "ignite",
  database: "rentalx",
  entities: [User, Category, Specification],
  migrations: [
    CreateCategories1673008287995, 
    CreateSpecifications1673437984780, 
    CreateUsers1673457397613, 
    AlterUserDeleteUsername1673460295780, 
    AlterUserAddAvatarColumn1673564546909
  ],
})

AppDataSource.initialize()
  .then(() => {
      console.log("Initialized");
  })
  .catch((error) => console.log(error))

export default AppDataSource