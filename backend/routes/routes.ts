import { Router } from "express";
import twitchAuthController from "./authTwitch/authTwitch.controller";
import voteController from "./vote/vote.controller";

const api = Router().use(twitchAuthController).use(voteController);

export default Router().use("/api", api);
