import { ObjectId } from "mongodb";

export interface Vote {
  matchId: string;
  vote: string;
  isVoteCorrect?: boolean;
}

export type VoteStatus =
  | "voteSuccess"
  | "alreadyVoted"
  | "noMatchFound"
  | "error";

export interface VoteResult {
  userId: string;
  twitchLogin: string;
  isVoteCorrect: boolean;
}
