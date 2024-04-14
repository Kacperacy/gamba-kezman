import { CronJob } from "cron";
import { Logger } from "../util/Logger";
import { RiotClient } from "../clients/RiotClient";
import { MongoDBClient } from "../clients/MongoDBClient";
import { VoteResult } from "../models/Vote";
import axios from "axios";

export default class CheckMatchId {
  cronJob: CronJob;

  constructor() {
    this.cronJob = new CronJob(
      "* * * * *",
      async () => {
        Logger.getInstance().info(
          "Checking match id",
          RiotClient.currentMatchId
        );
        try {
          await this.handle();
        } catch (err) {
          Logger.getInstance().error("CheckMatchId error", err);
        }
      },
      null,
      true
    );
  }

  public async handle() {
    try {
      const riotClient = RiotClient.getInstance();

      const lastMatch = await riotClient.getLastMatch();

      if (lastMatch !== RiotClient.currentMatchId) {
        Logger.getInstance().info("New match detected", lastMatch);
        const results = (await MongoDBClient.getInstance().getMatchVotes(
          RiotClient.currentMatchId,
          lastMatch
        )) as VoteResult[];

        try {
          for (const result of results) {
            if (!result.isVoteCorrect) {
              const data = {
                userId: result.userId,
                streamer: "kezman22",
                time: 1800,
                message: "Źle przewidziałeś wynik gierki kezmana beka",
              };

              const params = data as unknown as Record<string, string>;

              await axios.post("https://dynamix-bot.glitch.me/timeout", params);
            }
          }
        } catch (err) {
          Logger.getInstance().error("Error banowanie", err);
        }

        Logger.getInstance().info("Match results", results);
        RiotClient.currentMatchId = lastMatch;
      }
    } catch (err) {
      Logger.getInstance().error("Error checking match id", err);
    }
  }
}
