import { NextFunction, Request, Response } from "express"
import { AppError } from "../error"


const onlyAdminPermissionMiddleware = (req:Request, res:Response, next:NextFunction) =>{
    const admin = res.locals.token.admin
   

    if(!admin){
        throw new AppError('Insufficient permission', 403)
    }

    next()
}

export { onlyAdminPermissionMiddleware }