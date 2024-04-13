import { MongoDBClient } from "../../clients/MongoDBClient";
import { Vote, VoteStatus } from "../../models/Vote";

export const makeVote = async (
  userId: string,
  matchId: string,
  vote: string
): Promise<VoteStatus> => {
  const voteData = {
    userId,
    matchId,
    vote,
  } as Vote;

  try {
    return await MongoDBClient.getInstance().makeVote(userId, voteData);
  } catch (err) {
    console.error(err);
    return "error";
  }
};
