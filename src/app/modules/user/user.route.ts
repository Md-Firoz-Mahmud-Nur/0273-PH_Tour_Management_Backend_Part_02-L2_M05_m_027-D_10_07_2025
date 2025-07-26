import { NextFunction, Request, Response, Router } from "express";
import { userControllers } from "./user.controller";
import z from "zod";
import { Types } from "mongoose";
import { Role, IAuthProvider } from "./user.interface";

const router = Router();

router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    const createZodSchema = z.object({
      name: z
        .string({ invalid_type_error: "Name must be string" })
        .min(3, { message: "Name too short, enter at least 3 character" })
        .max(50, { message: "Name too long, enter at most 50 character" }),
      email: z
        .string()
        .email({ message: "Enter a valid email" })
        .min(5, { message: "Email must be at least 5 characters long." })
        .max(100, { message: "Email cannot exceed 100 characters." }),
      password: z
        .string({ invalid_type_error: "Password must be string" })
        .min(8, { message: "Password must be at least 8 characters long." })
        .regex(/^(?=.*[A-Z])/, {
          message: "Password must contain at least 1 uppercase letter.",
        })
        .regex(/^(?=.*[!@#$%^&*])/, {
          message: "Password must contain at least 1 special character.",
        })
        .regex(/^(?=.*\d)/, {
          message: "Password must contain at least 1 number.",
        }),
      phone: z
        .string({ invalid_type_error: "Phone Number must be string" })
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
          message:
            "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
        })
        .optional(),
      address: z
        .string({ invalid_type_error: "Address must be string" })
        .max(200, { message: "Address cannot exceed 200 characters." })
        .optional(),
    });
    req.body = await createZodSchema.parseAsync(req.body);
    console.log(req.body);
  },
  userControllers.createUser
);
router.get("/all-users", userControllers.getAllUsers);

export const userRoutes = router;
