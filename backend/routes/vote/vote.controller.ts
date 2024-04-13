import { Router } from "express";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

/**
 * GET vote/
 * Handles the voting process
 */
router.get("/vote", async (req, res) => {
  const { vote } = req.query;

  if (typeof vote !== "string") {
    return res.status(400).send("Invalid parameters");
  }

  try {
    // Do something with the vote
    res.status(200).send();
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
});

export default router;
