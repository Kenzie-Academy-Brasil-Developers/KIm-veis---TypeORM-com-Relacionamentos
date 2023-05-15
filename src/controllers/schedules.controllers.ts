import { Request, Response } from "express"
import { createScheduleService } from "../services/schedules/createSchedule.service"
import { TScheduleRequest } from "../interfaces/schedules.interfaces"
import { listSchedulesService } from "../services/schedules/listSchedules.service"



const createScheduleController = async (req:Request, res:Response) =>{
    const realEstateId:number = (req.body.realEstateId)
    delete req.body.realEstateId
    const requestData = req.body
    const userId:number = Number(res.locals.token.id)

    const newSchedule = await createScheduleService(requestData, userId, realEstateId)

    return res.status(201).json({message: "Schedule created"})
}


const listScheduleController =async (req:Request, res:Response):Promise<Response> => {
    const realEstateId: number = Number(req.params.id)


    const schedule = await listSchedulesService(realEstateId)
    return res.json(schedule)
}

export { createScheduleController, listScheduleController }