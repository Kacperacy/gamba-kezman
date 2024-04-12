import axios from "axios";

export class TwitchAuthGuard {
  public static async generateToken(code: string, redirectUri?: string) {
    try {
      const data = {
        client_id: process.env.TWITCH_CLIENT_ID,
        client_secret: process.env.TWITCH_CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
        redirect_uri:
          redirectUri ||
          process.env.TWITCH_REDIRECT_URI ||
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

      // const refreshToken = response.data.refresh_token;
      const accessToken = response.data.access_token;

      // Validate the access token by making a request to Twitch's validate endpoint
      // const validateResponse = await axios.get(
      //   "https://id.twitch.tv/oauth2/validate",
      //   {
      //     headers: {
      //       Authorization: `OAuth ${accessToken}`,
      //     },
      //   }
      // );

      // const userId = validateResponse.data.user_id;

      return accessToken;
    } catch (error: any) {
      console.error("Error generating token:");
      throw error;
    }
  }
}
