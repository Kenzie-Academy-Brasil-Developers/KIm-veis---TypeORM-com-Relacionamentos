import { NextFunction, Request, Response } from "express"
import { AppError } from "../error"

const ensureIsAdminMiddleware = (req:Request, res:Response, next:NextFunction) =>{
    const admin = res.locals.token.admin
    const tokenId:number = Number(res.locals.token.id)
    const id:number = Number(req.params.id)

    if(!admin && tokenId !== id){
        throw new AppError('Insufficient permission', 403)
    }

    next()
}

export { ensureIsAdminMiddleware }