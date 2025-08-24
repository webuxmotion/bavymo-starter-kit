import { Router, type Request, type Response } from "express";
import { generateWord } from "../../utils/generateWord";

const router = Router();

// GET /api/generate-personal-code
router.get("/", (req: Request, res: Response) => {
  const personalCode = generateWord();
  res.json({ personalCode });
});

export default router;