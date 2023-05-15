import { Router } from "express";
import { createUserController, deleteUserController, listUsersController, updateUserController } from "../controllers/users.controllers";
import { ensureRequestIsValidMiddleware } from "../middlewares/ensureRequestIsValid.middleware";
import { userRequestSchema, userUpdateSchema } from "../schemas/users.schemas";
import { ensureEmailExistsMiddleware } from "../middlewares/ensureEmailExists.middleware";
import { ensureTokenIsValidMiddleware } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureIsAdminMiddleware } from "../middlewares/ensureIsAdmin.middleware";
import { onlyAdminPermissionMiddleware } from "../middlewares/onlyAdminPermission.middleware";
import { ensureUserIdIsValidMiddleware } from "../middlewares/ensureIdIsValid.middleware";

const userRoutes: Router = Router()

userRoutes.post('',ensureRequestIsValidMiddleware(userRequestSchema),ensureEmailExistsMiddleware ,createUserController)
userRoutes.get('',ensureTokenIsValidMiddleware , listUsersController )
userRoutes.patch('/:id', ensureTokenIsValidMiddleware,ensureRequestIsValidMiddleware(userUpdateSchema),ensureUserIdIsValidMiddleware ,ensureIsAdminMiddleware,updateUserController)
userRoutes.delete('/:id',ensureTokenIsValidMiddleware, ensureUserIdIsValidMiddleware,onlyAdminPermissionMiddleware, deleteUserController )


export default userRoutes