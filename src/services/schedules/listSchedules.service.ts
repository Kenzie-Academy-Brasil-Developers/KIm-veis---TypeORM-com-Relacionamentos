import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { RealEstate, Schedule } from "../../entities"
import { AppError } from "../../error"



const listSchedulesService = async (realEstateId:number) =>{
    const scheduleRepository:Repository<Schedule> = AppDataSource.getRepository(Schedule)
    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)

    const realEstate: RealEstate | null = await realEstateRepository.createQueryBuilder('realEstate')
    .where('realEstate.id = :id', {id:realEstateId} )
    .leftJoinAndSelect('realEstate.schedules', 'schedule')
    .leftJoinAndSelect('realEstate.address', 'address')
    .leftJoinAndSelect('realEstate.category', 'category')
    .leftJoinAndSelect('schedule.user', 'user')
    .getOne()

    if(!realEstate){
        throw new AppError('RealEstate not found', 404)
    }
    
    return realEstate
}

export { listSchedulesService }