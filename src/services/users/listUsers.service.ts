import { Repository } from "typeorm"
import { User } from "../../entities"
import { AppDataSource } from "../../data-source"
import { listUsersResponseSchema } from "../../schemas/users.schemas"
import { TUsersResponse } from "../../interfaces/users.interfaces"
import { Request, Response } from "express"
import { AppError } from "../../error"

const listUsersService = async(req:Request, res:Response):Promise<TUsersResponse> =>{
    const userRepository:Repository<User> = AppDataSource.getRepository(User)

    const isAdmin = res.locals.token.admin

    if(!isAdmin){
        throw new AppError('Insufficient permission', 403)
    }

    const users: User[] | undefined = await userRepository.find()

    const usersResponse:TUsersResponse = listUsersResponseSchema.parse(users)

    return usersResponse

}

export { listUsersService }