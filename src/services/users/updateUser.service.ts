import { Repository } from "typeorm"
import { TUserResponse, TUserUpdate } from "../../interfaces/users.interfaces"
import { User } from "../../entities"
import { AppDataSource } from "../../data-source"
import { userResponseSchema } from "../../schemas/users.schemas"

const updateUserService = async (userId:number, userData:TUserUpdate):Promise<TUserResponse> =>{
    const userRepository:Repository<User> = AppDataSource.getRepository(User)

    const currentUserData:User | null = await userRepository.findOneBy({
        id:userId
    })
    

    const newUserData: User = userRepository.create({
        ...currentUserData,
        ...userData
    })

    await userRepository.save(newUserData)

    const userResponse:TUserResponse = userResponseSchema.parse(newUserData)

    return userResponse

}

export { updateUserService }