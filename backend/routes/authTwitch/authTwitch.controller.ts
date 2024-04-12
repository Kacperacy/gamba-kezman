import { Router, Request, Response } from "express";
import dotenv from "dotenv";
import { TwitchAuthGuard } from "../../util/TwitchAuthGuard";
import { HttpStatusCode } from "axios";

dotenv.config();

const router = Router();

/**
 * GET auth/twitch/login
 * Handles the login process for Twitch
 */
router.get("/auth/twitch/login", async (req: Request, res: Response) => {
  const { authCode, redirectUri } = req.query;

  if (typeof authCode !== "string" || typeof redirectUri !== "string") {
    return res.status(400).send("Invalid parameters");
  }

  try {
    const token = await TwitchAuthGuard.generateToken(authCode, redirectUri);

    if (!token) {
      return res.status(HttpStatusCode.Unauthorized).send();
    }

    res.status(HttpStatusCode.Ok).send(token);
  } catch (e) {
    console.error(e);
    res.status(HttpStatusCode.InternalServerError).send();
  }
});

export default router;
