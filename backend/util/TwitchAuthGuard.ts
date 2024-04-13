import axios from "axios";
import { MongoDBClient } from "../clients/MongoDBClient";

export class TwitchAuthGuard {
  public static async generateToken(code: string, redirectUri?: string) {
    try {
      const data = {
        client_id: process.env.TWITCH_APP_CLIENT_ID,
        client_secret: process.env.TWITCH_APP_CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
        redirect_uri:
          redirectUri ||
          process.env.TWITCH_APP_REDIRECT_URI ||
          "http://localhost:5173/oauth",
      };

      const params = new URLSearchParams(
        data as unknown as Record<string, string>
      );

      const response = await axios.post(
        "https://id.twitch.tv/oauth2/token",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const refreshToken = response.data.refresh_token;
      const accessToken = response.data.access_token;

      const validateResponse = await axios.get(
        "https://id.twitch.tv/oauth2/validate",
        {
          headers: {
            Authorization: `OAuth ${accessToken}`,
          },
        }
      );

      const login = validateResponse.data.login;
      const userId = validateResponse.data.user_id;

      return { accessToken, refreshToken, userId, login };
    } catch (error: any) {
      console.error("Error generating token:");
      throw error;
    }
  }

  public static async refreshToken(token: string) {
    try {
      const user = await MongoDBClient.getInstance().getUserByTwitchAccessToken(
        token
      );

      const data = {
        client_id: process.env.TWITCH_APP_CLIENT_ID,
        client_secret: process.env.TWITCH_APP_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: user.twitchRefreshToken,
      };

      const params = new URLSearchParams(
        data as unknown as Record<string, string>
      );

      const response = await axios.post(
        "https://id.twitch.tv/oauth2/token",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      user.twitchAccessToken = response.data.access_token;
      await MongoDBClient.getInstance().updateUser(user);

      return response.data.access_token;
    } catch (error: any) {
      console.error("Error refreshing token:");
      throw error;
    }
  }
}
