import { z } from "zod";

export const taskValidationSchema = z.object({
  newDocument: z.string().min(1, { message: "Task name is required." }),
  newTodoTime: z
    .number()
    .min(1, { message: "Duration must be at least 1 hour." }),
  newTodoDescription: z
    .string()
    .min(1, { message: "Description is required." }),
  newTodoStatus: z.enum(["waiting", "doing", "done"], {
    message: "Status is required.",
  }),
});
