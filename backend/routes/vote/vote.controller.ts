import { Router } from "express";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

/**
 * GET vote/
 * Handles the voting process
 */
router.get("/vote", async (req, res) => {
  res.status(200).send(req.query);
});

export default router;
