import { Router } from "express";
import { ensureTokenIsValidMiddleware } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureRequestIsValidMiddleware } from "../middlewares/ensureRequestIsValid.middleware";
import { scheduleRequestSchema } from "../schemas/schedules.schemas";
import { createScheduleController, listScheduleController } from "../controllers/schedules.controllers";
import { onlyAdminPermissionMiddleware } from "../middlewares/onlyAdminPermission.middleware";


const scheduleRoutes:Router = Router()

scheduleRoutes.post('', ensureTokenIsValidMiddleware, ensureRequestIsValidMiddleware(scheduleRequestSchema), createScheduleController)
scheduleRoutes.get('/realEstate/:id', ensureTokenIsValidMiddleware, onlyAdminPermissionMiddleware, listScheduleController)


export default scheduleRoutes