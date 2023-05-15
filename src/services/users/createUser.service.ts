import { Repository } from "typeorm";
import { TUserRequest, TUserResponse } from "../../interfaces/users.interfaces";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { userResponseSchema } from "../../schemas/users.schemas";


const createUserService = async(userData:TUserRequest):Promise<TUserResponse> =>{

    const userRepository:Repository<User> = AppDataSource.getRepository(User)

    const user:User = userRepository.create(userData)
    await userRepository.save(user)

    const userResponse:TUserResponse = userResponseSchema.parse(user)

    return userResponse
}

export { createUserService }