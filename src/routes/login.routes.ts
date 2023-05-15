import { Router } from "express";
import { createSessionController } from "../controllers/login.controllers";
import { ensureRequestIsValidMiddleware } from "../middlewares/ensureRequestIsValid.middleware";
import { loginSchema } from "../schemas/login.schemas";


const loginRoutes:Router = Router()

loginRoutes.post('', ensureRequestIsValidMiddleware(loginSchema),createSessionController)

export default loginRoutes