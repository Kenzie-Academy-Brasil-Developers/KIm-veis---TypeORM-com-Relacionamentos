import { Router } from "express";
import { createRealEstateController, listRealEstateController } from "../controllers/realEstate.controllers";
import { ensureTokenIsValidMiddleware } from "../middlewares/ensureTokenIsValid.middleware";
import { onlyAdminPermissionMiddleware } from "../middlewares/onlyAdminPermission.middleware";
import { ensureRequestIsValidMiddleware } from "../middlewares/ensureRequestIsValid.middleware";
import { realEstateRequestSchema } from "../schemas/realEstate.schemas";

const realEstateRoutes: Router = Router()

realEstateRoutes.post('',ensureTokenIsValidMiddleware,ensureRequestIsValidMiddleware(realEstateRequestSchema),onlyAdminPermissionMiddleware ,createRealEstateController )
realEstateRoutes.get('', listRealEstateController)



export default realEstateRoutes