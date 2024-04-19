import axios from "axios";
import { Config } from "../../Config";

interface VotingProps {
  userId: string;
}

const Voting = (props: VotingProps) => {
  const makeVote = async (vote: string) => {
    if (!props.userId) return;
    if (vote !== "yes" && vote !== "no") return;
    if (
      confirm(
        `Czy na pewno chcesz zagłosować na "${
          vote == "yes" ? "BOTTOM" : "TOPKA"
        }"?`
      ) === false
    )
      return;

    const result = await axios.get(
      `${Config.getBackendUrl()}/vote?userId=${props.userId}&vote=${vote}`
    );

    switch (result.data) {
      case "voteSuccess":
        alert("Głos został oddany pomyślnie!");
        break;
      case "alreadyVoted":
        alert("Już oddałeś głos!");
        break;
      case "noMatchFound":
        alert("Kezman nie jest w grze!");
        break;
      case "error":
        alert("Wystąpił błąd!");
        break;
    }
  };

  return (
    <div className="home-user-container-vote">
      <div
        onClick={() => makeVote("no")}
        className="home-user-container-vote-button home-user-container-vote-button-no"
      >
        TOPKA
      </div>
      <div
        onClick={() => makeVote("yes")}
        className="home-user-container-vote-button home-user-container-vote-button-yes"
      >
        BOTTOM
      </div>
    </div>
  );
};

export default Voting;
