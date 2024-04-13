import { Collection, MongoClient, ServerApiVersion } from "mongodb";
import User from "../models/User";
import { Logger } from "../util/Logger";
import { Vote, VoteStatus } from "../models/Vote";

export class MongoDBClient {
  private client: MongoClient;

  private static instance: MongoDBClient;

  static getInstance(): MongoDBClient {
    if (!this.instance) this.instance = new MongoDBClient();
    return this.instance;
  }

  constructor() {
    if (!process.env.DB_CONN_STRING) {
      Logger.getInstance().error("DB_CONN_STRING not found in config");
      throw new Error("DB_CONN_STRING not found in config");
    }

    this.client = new MongoClient(process.env.DB_CONN_STRING, {
      serverApi: {
        version: ServerApiVersion.v1,
        deprecationErrors: true,
      },
    });
    this.client.connect();
  }

  async updateUser(user: User): Promise<void> {
    try {
      const users = this.client
        .db(process.env.USERS_DB_NAME || "twitch")
        .collection(process.env.USERS_COLLECTION_NAME || "users");

      await users.updateOne(
        { twitchId: user.twitchId },
        { $set: user },
        { upsert: true }
      );
    } catch (err) {
      Logger.getInstance().error("update user error", err);
    }
  }

  async getUserByTwitchAccessToken(accessToken: string): Promise<User> {
    try {
      const users = this.client
        .db(process.env.USERS_DB_NAME)
        .collection(process.env.USERS_COLLECTION_NAME || "users");

      const user = (await users.findOne({
        twitchAccessToken: accessToken,
      })) as User;

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    } catch (err) {
      Logger.getInstance().error("get user by twitch access token error", err);
      throw err;
    }
  }

  async makeVote(userId: string, vote: Vote): Promise<VoteStatus> {
    try {
      const users = this.client
        .db(process.env.USERS_DB_NAME)
        .collection(
          process.env.USERS_COLLECTION_NAME || "users"
        ) as Collection<User>;

      const existingVote = await users.findOne({
        twitchId: userId,
        "votes.matchId": vote.matchId,
      });

      if (existingVote) {
        return "alreadyVoted";
      }

      await users.updateOne(
        { twitchId: userId },
        { $push: { votes: vote } },
        { upsert: true }
      );

      return "voteSuccess";
    } catch (err) {
      Logger.getInstance().error("make vote error", err);
      return "error";
    }
  }
}
