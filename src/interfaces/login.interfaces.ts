import { z } from "zod";
import { loginSchema } from "../schemas/login.schemas";

type TLoginRequest = z.infer<typeof loginSchema>

export { TLoginRequest }