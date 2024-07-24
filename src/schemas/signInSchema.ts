import { z } from "zod";

export const signInSchema = z.object({
  //   you can call it email or username or anything else
  identifier: z.string(),
  password: z.string(),
});
