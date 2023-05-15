import { z } from "zod";
import { onlyScheduleDataSchema, scheduleRequestSchema, scheduleSchema } from "../schemas/schedules.schemas";

type TSchedule = z.infer<typeof scheduleSchema>
type TScheduleRequest = z.infer<typeof scheduleRequestSchema>
type TScheduleData = z.infer<typeof onlyScheduleDataSchema>


export { TSchedule, TScheduleRequest, TScheduleData }