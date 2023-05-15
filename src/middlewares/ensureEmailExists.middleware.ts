import { NextFunction, Request, Response } from "express";
import { TUserRequest } from "../interfaces/users.interfaces";
import { Repository } from "typeorm";
import { User } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";


const ensureEmailExistsMiddleware = async (req:Request, res:Response, next: NextFunction):Promise<Response | void > => {
    const userData:TUserRequest = req.body

    const userRepository:Repository<User> = AppDataSource.getRepository(User)

    const user: User | null = await userRepository.findOne({
        where:{
            email: userData.email
        }
    })

    if(user?.email === userData.email){
        throw new AppError('Email already exists', 409)
    }

    return next()
}

export { ensureEmailExistsMiddleware }