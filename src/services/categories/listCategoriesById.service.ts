import { Repository } from "typeorm"
import { Category } from "../../entities"
import { AppDataSource } from "../../data-source"
import { AppError } from "../../error"



//buscar categorias por Id
const listCategoriesByIdService = async (categoryId:number) =>{
    const categoryRepository:Repository<Category> = AppDataSource.getRepository(Category)

    const categories: Category | null = await categoryRepository.findOne({
        ////buscar categorias por Id
        where:{
            id:categoryId
        },
        relations:{//carregamento de relacionamentos..
            realEstate:true
        }

    })
    
    if(!categories){//se nenhuma categoria for encontrada..
        throw new AppError('Category not found', 404)
    }
    
    return categories

}


export { listCategoriesByIdService }