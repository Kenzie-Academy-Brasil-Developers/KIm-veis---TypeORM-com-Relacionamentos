import { Repository } from "typeorm"
import { TCategory, TCategoryRequest } from "../../interfaces/categories.interfaces"
import { Category } from "../../entities"
import { AppDataSource } from "../../data-source"



const createCategoryService = async(categoryData:TCategoryRequest):Promise<TCategory> =>{

    const categoryRepository:Repository<Category> = AppDataSource.getRepository(Category)

    const category:TCategory = categoryRepository.create(categoryData)
    await categoryRepository.save(category)

    return category
}

export { createCategoryService }