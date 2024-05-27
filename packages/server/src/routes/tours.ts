import express, { Request, Response } from "express";
import tours from "../services/tour-svc";
import { Tour } from "../models";

const router = express.Router();

router.get("/:tourid", (req: Request, res: Response) => {
  const { tourid } = req.params;

  tours
    .get(tourid)
    .then((tour: Tour) => res.json(tour))
    .catch((err) => res.status(404).end());
});

router.post("/", (req: Request, res: Response) => {
  const newTour = req.body;

  tours
    .create(newTour)
    .then((tour: Tour) => res.status(201).send(tour))
    .catch((err) => res.status(500).send(err));
});

router.get("/", (req: Request, res: Response) => {
  tours
    .index()
    .then((list: Tour[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

router.put("/:tourid", (req: Request, res: Response) => {
  const { tourid } = req.params;
  const newTour = req.body;

  tours
    .update(tourid, newTour)
    .then((profile: Tour) => res.json(profile))
    .catch((err) => res.status(404).end());
});

export default router;
