import { z } from "zod";
import { categoryRequestSchema, categorySchema } from "../schemas/categories.schemas";

type TCategory = z.infer<typeof categorySchema>
type TCategoryRequest = z.infer<typeof categoryRequestSchema>


export { TCategory, TCategoryRequest }