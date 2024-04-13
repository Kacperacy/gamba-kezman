import { MongoDBClient } from "../../clients/MongoDBClient";
import User from "../../models/User";

export const updateUserData = async (
  userId: string,
  login: string,
  accessToken: string,
  refreshToken: string
): Promise<void> => {
  const client = MongoDBClient.getInstance();
  const user = {
    twitchId: userId,
    twitchLogin: login,
    twitchAccessToken: accessToken,
    twitchRefreshToken: refreshToken,
  } as User;

  try {
    await client.updateUser(user);
  } catch (err) {
    console.error(err);
  }
};
