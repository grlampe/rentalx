import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "@errors/AppError";
import { UsersRepository } from "@modules/account/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
};

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing from request", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, "484f1c5d540e55294143e3d476346509") as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findByID(user_id);

    if (!user) {
      throw new AppError("User not found", 401);
    }
    
    request.user = {
      id: user_id  
    }

    next();
  } catch {
    throw new AppError("Invalid token", 401);  
  }
}