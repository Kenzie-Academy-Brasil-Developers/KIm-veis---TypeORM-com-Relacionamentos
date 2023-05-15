import { NextFunction, Request, Response } from "express"
import { AppError } from "../error"
import { verify } from "jsonwebtoken"
import "dotenv/config"



const ensureTokenIsValidMiddleware =async (req:Request, res:Response, next:NextFunction):Promise<Response | void> => {

    const authorization = req.headers.authorization

    if(!authorization){
        throw new AppError('Missing bearer token', 401)
    }

    const token = authorization.split(' ')[1]

    verify(token, String(process.env.SECRET_KEY), (err:any, decoded:any) =>{
        if(err){
            throw new AppError(err.message , 401)
        }
        
        res.locals.token = {
            id: decoded.sub,
            admin: decoded.admin
        }
    })

    return next()
}

export { ensureTokenIsValidMiddleware }