import { NextFunction, Request, Response } from "express"
import { TCategoryRequest } from "../interfaces/categories.interfaces"
import { Repository } from "typeorm"
import { Category } from "../entities"
import { AppDataSource } from "../data-source"
import { AppError } from "../error"




const ensureCategoryExistsMiddleware = async (req:Request, res:Response, next: NextFunction):Promise<Response | void > => {
    const categoryData:TCategoryRequest = req.body

    const categoryRepository:Repository<Category> = AppDataSource.getRepository(Category)

    const category: Category | null = await categoryRepository.findOne({
        where:{
            name: categoryData.name
        }
    })

    if(category?.name === categoryData.name){
        throw new AppError('Category already exists', 409)
    }

    return next()
}

export { ensureCategoryExistsMiddleware }