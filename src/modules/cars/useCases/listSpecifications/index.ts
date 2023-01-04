import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { ListSpecificationsController } from "./ListSpecificationsController";
import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

const specificationRepository = SpecificationsRepository.getInstance();
const listSpecificationUseCase = new ListSpecificationsUseCase(specificationRepository);
const listSpecificationController = new ListSpecificationsController(listSpecificationUseCase);

export { listSpecificationController};