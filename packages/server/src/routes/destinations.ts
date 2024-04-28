import { Router, Request, Response } from "express";
import { destinations } from "../data/destinations";

const router = Router();
router.get("/", (req: Request, res: Response) => {
  res.json(destinations);
});

export default router;
