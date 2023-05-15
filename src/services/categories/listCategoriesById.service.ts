import { Repository } from "typeorm"
import { Category } from "../../entities"
import { AppDataSource } from "../../data-source"
import { AppError } from "../../error"




const listCategoriesByIdService = async (categoryId:number) =>{
    const categoryRepository:Repository<Category> = AppDataSource.getRepository(Category)

    const categories: Category | null = await categoryRepository.findOne({
        where:{
            id:categoryId
        },
        relations:{
            realEstate:true
        }

    })
    
    if(!categories){
        throw new AppError('Category not found', 404)
    }
    
    return categories

}


export { listCategoriesByIdService }