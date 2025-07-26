import { Router } from "express";
import { userControllers } from "./user.controller";
import { createZodSchema } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";

const router = Router();

router.post(
  "/register",
  validateRequest(createZodSchema),
  userControllers.createUser
);
router.get("/all-users", userControllers.getAllUsers);

export const userRoutes = router;
