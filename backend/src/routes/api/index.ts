import { Router } from "express";
import personalCodeRouter from "./personalCode";
// import other routers here later, e.g. import userRouter from "./user";

const router = Router();

// Mount all individual routes without /api prefix
router.use("/generate-personal-code", personalCodeRouter);
// router.use("/users", userRouter); // example for future routes

export default router;