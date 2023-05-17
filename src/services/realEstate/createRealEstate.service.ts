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

      //verifica se address ja existe no banco de dados
    const findAddress:Address | null = await addressRepository.findOneBy({
        //método findoneby procura address com os mesmos valores.
        city:requestData.address.city,
        street:requestData.address.street,
        state: requestData.address.state,
        zipCode: requestData.address.zipCode,
        number: requestData.address.number?requestData.address.number:""
    })

    if(findAddress){//se encontrar o endereço
        throw new AppError('Address already exists', 409)
    }

    const addressData:TAddressRequest = requestData.address

    const address:Address = addressRepository.create(addressData)//cria um novo endereço com método create
    
    await addressRepository.save(address) //salva no banco de dados com método save.

    const category:TCategory | null = await categoryRepository.findOneBy({ //buscam category no banco de dados.
       
        id:requestData.categoryId
    })

    if(!category){//Se nenhuma categoria for encontrada
        throw new AppError('Category not found', 404)
    }

    const sendInfo = realEstateSchemaWithoutAddress.parse(requestData)
    //parse analisa e valida os dados.

   
    const realEstate: RealEstate = realEstateRepository.create({ //cria uma nova instancia realEstate
        ...sendInfo,//recebe os dados de senInfo
        address:address,
        category:category

    })
    await realEstateRepository.save(realEstate)//salva no banco de dados

    return realEstate//retorna a instancia criada


}

export { createRealEstateService }