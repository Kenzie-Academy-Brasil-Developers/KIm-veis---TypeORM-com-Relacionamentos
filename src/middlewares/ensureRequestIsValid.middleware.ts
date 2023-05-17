import { NextFunction, Request, Response } from "express"
import { ZodTypeAny } from "zod"



const ensureRequestIsValidMiddleware = (schema:ZodTypeAny) => (req:Request, res:Response, next:NextFunction) =>{

    const validateData = schema.parse(req.body)//faz validação dos dados presentes no corpo da requisição
//Se os dados não corresponderem ao esquema definido, uma exceção será lançada. Caso contrário, os dados validados são armazenados na variável validateData.

    req.body = validateData//substitui o corpo da solicitação original (req.body) pelos dados 

    return next()

}

export { ensureRequestIsValidMiddleware }