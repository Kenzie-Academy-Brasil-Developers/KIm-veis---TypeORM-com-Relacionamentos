import { Repository } from "typeorm"//interage com banco de dados..
import { AppDataSource } from "../../data-source"
import { RealEstate } from "../../entities"
import { AppError } from "../../error"



const listSchedulesService = async (realEstateId:number) =>{

    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)// Cria uma instância do repositório 

    const realEstate: RealEstate | null = await realEstateRepository.createQueryBuilder('realEstate')//retorna o repositório do RealEstate
    .where('realEstate.id = :id', {id:realEstateId} )
    .leftJoinAndSelect('realEstate.schedules', 'schedule')// faz um join com a tabela shedules do realEstate
    .leftJoinAndSelect('realEstate.address', 'address')
    .leftJoinAndSelect('realEstate.category', 'category')
    .leftJoinAndSelect('schedule.user', 'user')
    .getOne()//: Executa a consulta e retorna apenas o primeiro resultado encontrado.

    if(!realEstate){//Se a consulta não retornar nenhum resultado
        throw new AppError('RealEstate not found', 404)
    }
    
    return realEstate
}

export { listSchedulesService }