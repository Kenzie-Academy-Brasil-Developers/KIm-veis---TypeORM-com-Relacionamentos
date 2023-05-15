import { z } from "zod";

const userSchema = z.object({
    id: z.number(),
    name: z.string().max(45),
    email: z.string().email(),
    password: z.string(),
    admin: z.boolean().default(false),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullish()
})

const userRequestSchema = userSchema.omit({
    id:true,
    createdAt:true,
    updatedAt:true,
    deletedAt:true,
})

const userResponseSchema = userSchema.omit({
    password:true
})

const userUpdateSchema = userRequestSchema.omit({admin:true}).partial()

const listUsersResponseSchema = z.array(userResponseSchema)


export { userSchema, userRequestSchema, userResponseSchema, userUpdateSchema, listUsersResponseSchema}