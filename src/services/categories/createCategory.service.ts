import { Repository } from "typeorm"
import { TCategory, TCategoryRequest } from "../../interfaces/categories.interfaces"
import { Category } from "../../entities"
import { AppDataSource } from "../../data-source"



const createCategoryService = async(categoryData:TCategoryRequest):Promise<TCategory> =>{

    const categoryRepository:Repository<Category> = AppDataSource.getRepository(Category)

    const category:TCategory = categoryRepository.create(categoryData)//método create do repositorio, cria uma nonva instancia da entidade.
    await categoryRepository.save(category)//método save do repositório para salvar instancia da category do banco de dados.

    return category//retorna a categoria recém criada...
}

export { createCategoryService }