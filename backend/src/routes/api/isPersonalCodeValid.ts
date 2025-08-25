import { Router, type Request, type Response } from "express";
import { store } from "../../store/store";

const router = Router();

// GET /api/is-personal-code-valid
router.get("/", (req: Request, res: Response) => {
    const personalCode = req.query.personalCode as string;
    const userExists = store.findByPersonalCode(personalCode);

    const valid = !userExists;

    res.json({ valid });
});

export default router;