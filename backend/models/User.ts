import { ObjectId } from "mongodb";
import { Vote } from "./Vote";

export default interface User {
  _id: ObjectId;
  twitchId: string;
  twitchUsername: string;
  twitchAccessToken: string;
  twitchRefreshToken: string;
  votes: Vote[];
}
