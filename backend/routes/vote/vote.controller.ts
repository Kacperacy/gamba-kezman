import { Router } from "express";
import dotenv from "dotenv";
import { RiotClient } from "../../clients/RiotClient";

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

  if (vote !== "yes" && vote !== "no") {
    return res.status(400).send("Invalid vote");
  }

  try {
    const lastMatchId = await RiotClient.getInstance().getLastMatch();

    res.status(200).json(lastMatchId);
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
});

export default router;
