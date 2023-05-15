import { Repository } from "typeorm"
import { TLoginRequest } from "../../interfaces/login.interfaces"
import { User } from "../../entities"
import { AppDataSource } from "../../data-source"
import { AppError } from "../../error"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import "dotenv/config"

const createSessionService = async (loginData:TLoginRequest):Promise<object> => {
    const userRepository:Repository<User> = AppDataSource.getRepository(User)

    const user: User | null = await userRepository.findOne({
        where:{
            email:loginData.email
        }
    }) 

    if(!user){
        throw new AppError('Invalid credentials', 401)
    }

    const comparePassword = await compare(loginData.password, user.password)

    if(!comparePassword){
        throw new AppError('Invalid credentials', 401)
    }

    const token = sign(
        {
            admin:user.admin
        },
        String(process.env.SECRET_KEY),
        {
            subject:String(user.id),
            expiresIn:'1d'
        }
    )

    return { token }
}


export { createSessionService }