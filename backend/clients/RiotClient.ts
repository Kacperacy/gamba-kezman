import axios from "axios";
import { Logger } from "../util/Logger";

export class RiotClient {
  private static instance: RiotClient;
  private static apiKey = process.env.RIOT_API_KEY || "";
  public static currentMatchId = "";

  public static kezmanPuuid =
    "jgo3_ws7PCwGaLHwrq3IpOlAgTAR2AIdBjzJBpimW5FqUkiXf8KORU-KrNhERtpUNFzgHDCves1v-A";

  static getInstance(): RiotClient {
    if (!this.instance) this.instance = new RiotClient();
    return this.instance;
  }

  private constructor() {
    if (!RiotClient.apiKey) {
      Logger.getInstance().error("RIOT_API_KEY not found in config");
      throw new Error("RIOT_API_KEY not found in config");
    }

    this.setMatchId();
  }

  async setMatchId(): Promise<void> {
    try {
      const lastMatch = await this.getLastMatch();
      RiotClient.currentMatchId = lastMatch;
    } catch (error) {
      Logger.getInstance().error("Error setting match id", error);
    }
  }

  async getLastMatch(): Promise<string> {
    try {
      const response = await axios.get(
        `https://europe.api.riotgames.com/tft/match/v1/matches/by-puuid/${RiotClient.kezmanPuuid}/ids?start=0&count=1&api_key=${RiotClient.apiKey}`
      );

      return response.data[0];
    } catch (error) {
      Logger.getInstance().error("Error getting last match", error);
      return "";
    }
  }

  // Jeżeli bottom to zwraca true
  async getMatchResult(matchId: string): Promise<boolean> {
    try {
      const response = await axios.get(
        `https://europe.api.riotgames.com/tft/match/v1/matches/${matchId}?api_key=${RiotClient.apiKey}`
      );

      return (
        (response.data.info.participants.find(
          (participant: any) => participant.puuid === RiotClient.kezmanPuuid
        ).placement as number) < 4
      );
    } catch (error) {
      Logger.getInstance().error("Error getting match result", error);
      return false;
    }
  }
}
