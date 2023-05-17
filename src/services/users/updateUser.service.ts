import { Repository } from "typeorm"
import { TUserResponse, TUserUpdate } from "../../interfaces/users.interfaces"
import { User } from "../../entities"
import { AppDataSource } from "../../data-source"
import { userResponseSchema } from "../../schemas/users.schemas"

// Função responsável por atualizar os dados do usuário
const updateUserService = async (userId: number, userData: TUserUpdate): Promise<TUserResponse> => {
    
  // Obtém o repositório de usuários do AppDataSource
  const userRepository: Repository<User> = AppDataSource.getRepository(User)

  // Procura o usuário pelo ID no banco de dados
  const currentUserData: User | null = await userRepository.findOneBy({
    id: userId
  })

  // Cria uma nova instância do usuário com os dados atualizados
  const newUserData: User = userRepository.create({
    ...currentUserData,
    ...userData
  })

  // Salva os novos dados do usuário no banco de dados
  await userRepository.save(newUserData)

  // Converte os dados do usuário para o formato de resposta definido pelo schema
  const userResponse: TUserResponse = userResponseSchema.parse(newUserData)

  // Retorna a resposta com os dados atualizados do usuário
  return userResponse
}

// Exporta a função updateUserService para ser utilizada em outros módulos
export { updateUserService }
