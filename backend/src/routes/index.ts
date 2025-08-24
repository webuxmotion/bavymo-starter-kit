import { Router, type Request, type Response } from "express";

const indexRouter = Router();

indexRouter.get("/", (req: Request, res: Response) => {
    res.send("BAVYMO. Hello from Express + TypeScript 🚀");
});

export default indexRouter;