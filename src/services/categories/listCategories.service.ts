import { Repository } from "typeorm"
import { Category } from "../../entities"
import { AppDataSource } from "../../data-source"



const listCategoriesService = async () =>{
    const categoryRepository:Repository<Category> = AppDataSource.getRepository(Category)

    const categories: Category[] | undefined = await categoryRepository.find()
    
    return categories

}

export { listCategoriesService }