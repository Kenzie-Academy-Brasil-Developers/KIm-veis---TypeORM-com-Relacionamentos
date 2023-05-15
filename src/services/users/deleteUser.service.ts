import { Repository } from "typeorm"
import { User } from "../../entities"
import { AppDataSource } from "../../data-source"


const deleteUserService = async (userId:number) =>{
    const userRepository:Repository<User> = AppDataSource.getRepository(User)

    const user: User | null = await userRepository.findOneBy({
        id:userId
    })

    await userRepository.softRemove(user!)

}


export { deleteUserService }