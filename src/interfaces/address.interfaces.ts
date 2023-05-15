import { z } from "zod";
import { addressRequestSchema, addressSchema } from "../schemas/address.schemas";

type TAddress = z.infer<typeof addressSchema >
type TAddressRequest = z.infer<typeof addressRequestSchema>

export { TAddress, TAddressRequest }