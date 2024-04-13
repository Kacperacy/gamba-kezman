import { ObjectId } from "mongodb";

export default interface User {
  _id: ObjectId;
  twitchId: string;
  twitchUsername: string;
  twitchAccessToken: string;
  twitchRefreshToken: string;
}
