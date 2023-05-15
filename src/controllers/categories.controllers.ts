import { Request, Response } from "express"
import { TCategoryRequest } from "../interfaces/categories.interfaces"
import { createCategoryService } from "../services/categories/createCategory.service"
import { listCategoriesService } from "../services/categories/listCategories.service"
import { listCategoriesByIdService } from "../services/categories/listCategoriesById.service"



const createCategoryController =async (req:Request, res:Response):Promise<Response> => {
    const categoryData:TCategoryRequest = req.body

    const newCategory = await createCategoryService(categoryData)

    return res.status(201).json(newCategory)
    
}


const listCategoriesController =async (req:Request, res:Response):Promise<Response> => {
    
    const categories = await listCategoriesService()
    return res.json(categories)
}

const listCategoriesByIdController =async (req:Request, res:Response):Promise<Response> => {
    const categoryId: number = Number(req.params.id)

    const categories = await listCategoriesByIdService(categoryId)
    
    return res.json(categories)
}


export { createCategoryController, listCategoriesController, listCategoriesByIdController  }