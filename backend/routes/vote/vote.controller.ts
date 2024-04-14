import { Router } from "express";
import dotenv from "dotenv";
import { RiotClient } from "../../clients/RiotClient";
import { makeVote } from "./vote.service";
import { HttpStatusCode } from "axios";

dotenv.config();

const router = Router();

/**
 * GET vote/
 * Handles the voting process
 */
router.get("/vote", async (req, res) => {
  const { userId, vote } = req.query;

  if (typeof vote !== "string" || typeof userId !== "string") {
    return res.status(HttpStatusCode.BadRequest).send("Invalid parameters");
  }

  if (vote !== "yes" && vote !== "no") {
    return res.status(HttpStatusCode.BadRequest).send("Invalid vote");
  }

  try {
    const lastMatchId = RiotClient.currentMatchId;

    if (!lastMatchId) {
      return res.status(HttpStatusCode.BadRequest).send("No match found");
    }

    const status = await makeVote(userId, lastMatchId, vote);

    res.status(HttpStatusCode.Ok).send(status);
  } catch (e) {
    console.error(e);
    res.status(HttpStatusCode.InternalServerError).send();
  }
});

export default router;
