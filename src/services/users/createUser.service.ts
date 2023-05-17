import { Repository } from "typeorm";
import { TUserRequest, TUserResponse } from "../../interfaces/users.interfaces";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { userResponseSchema } from "../../schemas/users.schemas";


//criar um novo usuário no banco de dados.
const createUserService = async(userData:TUserRequest):Promise<TUserResponse> =>{

    const userRepository:Repository<User> = AppDataSource.getRepository(User)

    const user:User = userRepository.create(userData)
    await userRepository.save(user)//salvar o usuário no banco de dados..

    const userResponse:TUserResponse = userResponseSchema.parse(user)//parse valida o objeto user

    return userResponse// representa a resposta do usuário criado
}

export { createUserService }