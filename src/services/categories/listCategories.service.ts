import { Repository } from "typeorm"
import { Category } from "../../entities"
import { AppDataSource } from "../../data-source"



const listCategoriesService = async () =>{
    const categoryRepository:Repository<Category> = AppDataSource.getRepository(Category)

    const categories: Category[] | undefined = await categoryRepository.find()
    // método find busca todas categorias
    //e armazena em categories como um array de objetos do tipo category ou undefined..
    
    return categories

}

export { listCategoriesService }