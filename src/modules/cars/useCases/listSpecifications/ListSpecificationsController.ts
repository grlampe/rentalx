import { Request, Response } from "express";
import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

export class ListSpecificationsController {
    constructor(private readonly listSpecificationsUseCase: ListSpecificationsUseCase) {};

    handle(request: Request, response: Response): Response {
      const specifications = this.listSpecificationsUseCase.execute();
      
      return response.json(specifications);
    }
}