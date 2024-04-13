import { Router, Request, Response } from "express";
import { TwitchAuthGuard } from "../../util/TwitchAuthGuard";
import { HttpStatusCode } from "axios";
import { updateUserData } from "./authTwitch.service";

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
    const userData = await TwitchAuthGuard.generateToken(authCode, redirectUri);

    if (!userData) {
      return res.status(HttpStatusCode.Unauthorized).send();
    }

    const id = updateUserData(
      userData.userId,
      userData.accessToken,
      userData.refreshToken
    );

    res.status(HttpStatusCode.Ok).send(userData.accessToken);
  } catch (e) {
    console.error(e);
    res.status(HttpStatusCode.InternalServerError).send();
  }
});

export default router;
