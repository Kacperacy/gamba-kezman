import { ObjectId } from "mongodb";

export interface Vote {
  matchId: string;
  vote: string;
}

export type VoteStatus =
  | "voteSuccess"
  | "alreadyVoted"
  | "noMatchFound"
  | "error";