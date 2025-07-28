import { NextFunction, Request, Response, Router } from "express";
import { userControllers } from "./user.controller";
import { createZodSchema } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/AppError";
import { Role } from "./user.interface";

const router = Router();

router.post(
  "/register",
  validateRequest(createZodSchema),
  userControllers.createUser
);
router.get(
  "/all-users",

  (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;
      if (!accessToken) {
        throw new AppError(403, "Access token not found");
      }
      const verifyAccessToken = jwt.verify(accessToken as string, "secret");

      if (
        (verifyAccessToken as JwtPayload).role !== Role.ADMIN &&
        (verifyAccessToken as JwtPayload).role !== Role.SUPER_ADMIN
      ) {
        throw new AppError(403, "You are not an admin");
      }

      next();
    } catch (error) {
      next(error);
    }
  },

  userControllers.getAllUsers
);

export const userRoutes = router;
