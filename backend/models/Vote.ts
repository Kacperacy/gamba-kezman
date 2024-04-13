import { ObjectId } from "mongodb";

export interface Vote {
  _id: ObjectId;
  userId: string;
  matchId: string;
  vote: string;
}

export type VoteStatus =
  | "voteSuccess"
  | "alreadyVoted"
  | "noMatchFound"
  | "error";
