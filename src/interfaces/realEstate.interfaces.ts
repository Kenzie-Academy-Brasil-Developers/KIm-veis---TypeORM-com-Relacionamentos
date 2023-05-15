import { z } from "zod";
import { realEstateRequestSchema, realEstateSchema } from "../schemas/realEstate.schemas";

type TRealEstate = z.infer<typeof realEstateSchema>
type TRealEstateRequest = z.infer<typeof realEstateRequestSchema>

export { TRealEstate, TRealEstateRequest }