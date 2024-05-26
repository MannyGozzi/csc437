import express, { Request, Response } from "express";
import { Profile } from "../models/profile";
import profiles from "../services/profile-svc";

const router = express.Router();

router.get("/:tourid", (req: Request, res: Response) => {
  const { tourid } = req.params;

  profiles
    .get(tourid)
    .then((profile: Profile) => res.json(profile))
    .catch((err) => res.status(404).end());
});

router.post("/", (req: Request, res: Response) => {
  const newProfile = req.body;

  profiles
    .create(newProfile)
    .then((profile: Profile) => res.status(201).send(profile))
    .catch((err) => res.status(500).send(err));
});

router.get("/", (req: Request, res: Response) => {
  profiles
    .index()
    .then((list: Profile[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

router.put("/:tourid", (req: Request, res: Response) => {
  const { tourid } = req.params;
  const newProfile = req.body;

  profiles
    .update(tourid, newProfile)
    .then((profile: Profile) => res.json(profile))
    .catch((err) => res.status(404).end());
});

export default router;
