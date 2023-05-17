import { Repository } from "typeorm"
import { RealEstate } from "../../entities"
import { AppDataSource } from "../../data-source"


const listRealEstateService = async () =>{
    const realEstateRepository:Repository<RealEstate> = AppDataSource.getRepository(RealEstate)

    const realEstate: RealEstate[] | undefined = await realEstateRepository.find({//consulta no banco de dados
   
        relations:{//juntamente com os relacionamentos no caso (address)
            address:true,
        }
    })
    
    return realEstate//retorna uma lista de imoveis encontrado.

}

export { listRealEstateService }