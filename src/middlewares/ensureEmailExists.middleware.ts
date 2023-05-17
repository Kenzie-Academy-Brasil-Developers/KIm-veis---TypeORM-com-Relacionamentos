import { NextFunction, Request, Response } from "express";
import { TUserRequest } from "../interfaces/users.interfaces";
import { Repository } from "typeorm";
import { User } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

//verificar se um determinado email já existe no banco de dados
const ensureEmailExistsMiddleware = async (req:Request, res:Response, next: NextFunction):Promise<Response | void > => {
    const userData:TUserRequest = req.body

    const userRepository:Repository<User> = AppDataSource.getRepository(User)//consulta no repositório de usuários para encontrar um usuário com o mesmo email fornecido 

    const user: User | null = await userRepository.findOne({// consulta é feita usando o método findOne
        where:{
            email: userData.email
        }
    })

    if(user?.email === userData.email){//verifica se user.email é igual a userData.email
        throw new AppError('Email already exists', 409)
    }

    return next()
}

export { ensureEmailExistsMiddleware }