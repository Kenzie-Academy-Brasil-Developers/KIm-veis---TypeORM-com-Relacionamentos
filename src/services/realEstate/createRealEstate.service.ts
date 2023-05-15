import { Repository } from "typeorm"
import { Address, Category, RealEstate } from "../../entities"
import { AppDataSource } from "../../data-source"
import { TRealEstateRequest } from "../../interfaces/realEstate.interfaces"
import { TAddressRequest } from "../../interfaces/address.interfaces"
import { realEstateSchemaWithoutAddress } from "../../schemas/realEstate.schemas"
import { AppError } from "../../error"
import { TCategory } from "../../interfaces/categories.interfaces"


const createRealEstateService = async(requestData:TRealEstateRequest) =>{
    const addressRepository: Repository<Address> = AppDataSource.getRepository(Address)
    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category)
    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)

    const findAddress:Address | null = await addressRepository.findOneBy({
        city:requestData.address.city,
        street:requestData.address.street,
        state: requestData.address.state,
        zipCode: requestData.address.zipCode,
        number: requestData.address.number?requestData.address.number:""
    })

    if(findAddress){
        throw new AppError('Address already exists', 409)
    }

    const addressData:TAddressRequest = requestData.address

    const address:Address = addressRepository.create(addressData)
    await addressRepository.save(address)

    const category:TCategory | null = await categoryRepository.findOneBy({
        id:requestData.categoryId
    })

    if(!category){
        throw new AppError('Category not found', 404)
    }

    const sendInfo = realEstateSchemaWithoutAddress.parse(requestData)


    const realEstate: RealEstate = realEstateRepository.create({
        ...sendInfo,
        address:address,
        category:category

    })
    await realEstateRepository.save(realEstate)

    return realEstate


}

export { createRealEstateService }