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
        //consulta banco ded dados para encontrar o usuario fornecido.
        where:{
            email:loginData.email
        }
    }) 

    if(!user){//se nunhum usuário for encontrado
        throw new AppError('Invalid credentials', 401)
    }

    //caso contrário 
    const comparePassword = await compare(loginData.password, user.password)
    //verifica se a senha loginData.password é igual do banco de dados.

    //se não for igual
    if(!comparePassword){
        throw new AppError('Invalid credentials', 401)
    }

    //se for igual
    //cria o token usando sign do pacote jsonwebtoken..
    const token = sign(
        {
            admin:user.admin//token contem payload com propriewda admin.
        },
        String(process.env.SECRET_KEY),//segredo para assinar o token
        {
            subject:String(user.id),//id do usuário é definido como subject do token
            expiresIn:'1d'//temp ode expriraçaõ de um dia.
        }
    )

    return { token }//retorna um objeto contendo o token.
}


export { createSessionService }