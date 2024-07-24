import { z } from "zod";

// here only we chech only one value so use .string() instead of .object()
export const usernameValidation = z
  .string()
  .min(2, "Username must be longer than 2 characters.")
  .max(20, "Username must be less than 20 characters.")
  .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters.");

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "Invalid email address, check email." }),
  password: z
    .string()
    .min(8, { message: "Password must be longer than 8 characters." }),
});
