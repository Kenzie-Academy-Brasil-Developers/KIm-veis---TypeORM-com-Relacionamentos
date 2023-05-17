import { Repository } from "typeorm";
import { TScheduleData } from "../../interfaces/schedules.interfaces";
import { RealEstate, Schedule, User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../error";


const createScheduleService = async(requestData:TScheduleData, userId:number, realEstateId:number) =>{//recebe 3 parametros.
     
     //repositorios do typeorm
    const userRepository:Repository<User> = AppDataSource.getRepository(User)
    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)
    const scheduleRepository: Repository<Schedule> = AppDataSource.getRepository(Schedule)

    const date = new Date(requestData.date)//cria objeto date com base no requestData.date
    const dayOfTheWeek = date.getDay()

    if(dayOfTheWeek == 0 || dayOfTheWeek == 6){
          throw new AppError('Invalid date, work days are monday to friday',400)
    }

   const realEstate : RealEstate | null = await realEstateRepository.findOne({
     //procura objeto Realstate no banco de dados
    where:{
        id: realEstateId
    }
   })

   if(!realEstate){//se não for encontrado
        throw new AppError('RealEstate not found', 404)
   }

   const user : User | null = await userRepository.findOne({
      //procura objeto user no banco de dados com base no userId
    where:{
        id:userId
    }
   })

   const hour = Number(requestData.hour.slice(0,2))//converte requestData.hour para um numero
   if(hour<8 || hour>18){
     throw new AppError('Invalid hour, available times are 8AM to 18PM', 400)
   }
  
   const userBooked: Schedule | null = await scheduleRepository.createQueryBuilder('schedule')
   // Cria uma consulta personalizada no banco de dados, utilizando o QueryBuilder do TypeORM

   // Busca agendamento existente no banco de dados com base na data, hora e ID do usuário
   .where('schedule.date = :date', { date: requestData.date })
   .andWhere('schedule.hour = :hour', { hour: requestData.hour })
   .andWhere('schedule.userId = :userId', { userId })
   .getOne()

if (userBooked) {
   // Se já existir um agendamento para o usuário nessa data e hora, lança uma exceção
   throw new AppError('User schedule to this real estate at this date and time already exists', 409)
}

const scheduleBooked: Schedule | null = await scheduleRepository.createQueryBuilder('schedule')
   // Cria uma nova consulta personalizada no banco de dados

   // Busca agendamento existente no banco de dados com base na data, hora e ID do imóvel
   .where('schedule.date = :date', { date: requestData.date })
   .andWhere('schedule.hour = :hour', { hour: requestData.hour })
   .andWhere('schedule.realEstateId = :realEstateId', { realEstateId })
   .getOne()

if (scheduleBooked) {
   // Se já existir um agendamento para o imóvel nessa data e hora, lança uma exceção
   throw new AppError('Schedule to this real estate at this date and time already exists', 409)
}

// Cria um novo objeto Schedule com os dados fornecidos
const newSchedule: Schedule = scheduleRepository.create({
   hour: requestData.hour,
   date: date,
   realEstate: realEstate,
   user: user!
})

// Salva o novo agendamento no banco de dados
await scheduleRepository.save(newSchedule)

// Retorna o novo agendamento como resultado da função
return newSchedule

}


export { createScheduleService }