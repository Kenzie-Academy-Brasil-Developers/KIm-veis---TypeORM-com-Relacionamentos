import { z } from "zod";
import { listUsersResponseSchema, userRequestSchema, userResponseSchema, userSchema, userUpdateSchema } from "../schemas/users.schemas";
import { DeepPartial } from "typeorm";

type TUser = z.infer<typeof userSchema >
type TUserRequest = z.infer<typeof userRequestSchema>
type TUserResponse = z.infer<typeof userResponseSchema>
type TUserUpdate = DeepPartial<typeof userUpdateSchema>
type TUsersResponse = z.infer<typeof listUsersResponseSchema>


export { TUser, TUserRequest, TUserResponse, TUserUpdate, TUsersResponse }