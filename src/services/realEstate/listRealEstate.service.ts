import { Repository } from "typeorm"
import { RealEstate } from "../../entities"
import { AppDataSource } from "../../data-source"



const listRealEstateService = async () =>{
    const realEstateRepository:Repository<RealEstate> = AppDataSource.getRepository(RealEstate)

    const realEstate: RealEstate[] | undefined = await realEstateRepository.find({
        relations:{
            address:true,
        }
    })
    
    return realEstate

}

export { listRealEstateService }