import dotenv from "dotenv";
import { MongoDBClient } from "../../clients/MongoDBClient";
import User from "../../models/User";

dotenv.config();

export const updateUserData = async (
  userId: string,
  accessToken: string,
  refreshToken: string
): Promise<void> => {
  const client = MongoDBClient.getInstance();
  const user = {
    twitchId: userId,
    twitchAccessToken: accessToken,
    twitchRefreshToken: refreshToken,
  } as User;

  try {
    await client.updateUser(user);
  } catch (err) {
    console.error(err);
  }
};
