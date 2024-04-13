import.meta.env.VITE_TWITCH_APP_CLIENT_ID;
import.meta.env.VITE_TWITCH_APP_REDIRECT_URI;
import.meta.env.VITE_BACKEND_URL;
import.meta.env.VITE_TWITCH_LOGIN_REDIRECT_URI;

export class Config {
  public static getTwitchAppClientId(): string {
    return import.meta.env.VITE_TWITCH_APP_CLIENT_ID as string;
  }
  public static getTwitchAppRedirectUri(): string {
    return (
      import.meta.env.VITE_TWITCH_LOGIN_REDIRECT_URI ||
      "http://localhost:5173/oauth"
    );
  }
  public static getBackendUrl(): string {
    return import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
  }
  public static getTwitchLoginRedirectUri(): string {
    return (
      import.meta.env.VITE_TWITCH_LOGIN_REDIRECT_URI ||
      "http://localhost:5173/oauth"
    );
  }
}
