import { Repository } from "typeorm"; 
import { User } from "../../entities"; 
import { AppDataSource } from "../../data-source"; 

const deleteUserService = async (userId:number) => { 
    const userRepository: Repository<User> = AppDataSource.getRepository(User); // Obtém o repositório do usuário do AppDataSource

    const user: User | null = await userRepository.findOneBy({ // Procura um usuário pelo id fornecido
        id: userId
    });

    await userRepository.softRemove(user!); // Remove suavemente o usuário do banco de dados

}

export { deleteUserService }; 
