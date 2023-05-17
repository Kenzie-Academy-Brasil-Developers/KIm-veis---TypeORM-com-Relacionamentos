import { Repository } from "typeorm"
import { User } from "../../entities"
import { AppDataSource } from "../../data-source"
import { listUsersResponseSchema } from "../../schemas/users.schemas"
import { TUsersResponse } from "../../interfaces/users.interfaces"
import { Request, Response } from "express"
import { AppError } from "../../error"

// Função assíncrona para listar usuários
const listUsersService = async(req: Request, res: Response): Promise<TUsersResponse> => {
    
    // Obtém o repositório de usuários da fonte de dados do aplicativo
    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    // Verifica se o usuário é administrador com base no token
    const isAdmin = res.locals.token.admin


    if (!isAdmin) {
        throw new AppError('Insufficient permission', 403)
    }

    // Obtém a lista de usuários do repositório
    const users: User[] | undefined = await userRepository.find()

    // Faz a validação da resposta dos usuários com base no esquema de resposta definido
    const usersResponse: TUsersResponse = listUsersResponseSchema.parse(users)


    return usersResponse
}


export { listUsersService }
