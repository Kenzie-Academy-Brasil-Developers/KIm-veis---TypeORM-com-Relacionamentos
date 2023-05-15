import { Router } from "express";
import { createCategoryController, listCategoriesByIdController, listCategoriesController } from "../controllers/categories.controllers";
import { ensureTokenIsValidMiddleware } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureRequestIsValidMiddleware } from '../middlewares/ensureRequestIsValid.middleware'
import { categoryRequestSchema } from "../schemas/categories.schemas";
import { onlyAdminPermissionMiddleware } from "../middlewares/onlyAdminPermission.middleware";
import { ensureCategoryExistsMiddleware } from "../middlewares/ensureCategoryExists.middleware";



const categoryRoutes: Router = Router()

categoryRoutes.post('', 
    ensureTokenIsValidMiddleware,
    ensureRequestIsValidMiddleware(categoryRequestSchema),
    onlyAdminPermissionMiddleware,
    ensureCategoryExistsMiddleware,
    createCategoryController)
categoryRoutes.get('', listCategoriesController)
categoryRoutes.get('/:id/realEstate', listCategoriesByIdController)

export default categoryRoutes