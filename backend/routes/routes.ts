import { Router } from "express";
import twitchAuthController from "./authTwitch/authTwitch.controller";

const api = Router().use(twitchAuthController);

export default Router().use("/api", api);
