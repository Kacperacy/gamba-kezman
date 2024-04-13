import { CronJob } from "cron";
import { Logger } from "../util/Logger";
import { RiotClient } from "../clients/RiotClient";
import { MongoDBClient } from "../clients/MongoDBClient";

export default class CheckMatchId {
  cronJob: CronJob;

  constructor() {
    this.cronJob = new CronJob(
      "* * * * *",
      async () => {
        console.log("Checking match id");
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
        const results = MongoDBClient.getInstance().getMatchVotes(
          RiotClient.currentMatchId
        );
        Logger.getInstance().info("Match results", results);
        RiotClient.currentMatchId = lastMatch;
      }
    } catch (err) {
      Logger.getInstance().error("Error checking match id", err);
    }
  }
}
