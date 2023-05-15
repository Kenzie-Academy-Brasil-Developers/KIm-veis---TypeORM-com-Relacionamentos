import { Request, Response } from "express";
import { createSessionService } from "../services/login/createSession.service";
import { TLoginRequest } from "../interfaces/login.interfaces";


const createSessionController =async (req:Request, res:Response):Promise<Response> => {
    const loginData:TLoginRequest = req.body

    const token = await createSessionService(loginData)

    return res.json(token)
    
}

export { createSessionController }