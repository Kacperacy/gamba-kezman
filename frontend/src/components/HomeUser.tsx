import axios from "axios";
import { useEffect, useState } from "react";
import { PersistentStore } from "../util/PersistentStore";
import { Config } from "../Config";
import "./HomeUser.css";

type User = {
  id: string;
  login: string;
  display_name: string;
  type: string;
  broadcaster_type: string;
  description: string;
  profile_image_url: string;
  offline_image_url: string;
  view_count: number;
  email: string;
};

export type VoteStatus =
  | "voteSuccess"
  | "alreadyVoted"
  | "noMatchFound"
  | "error";

const HomeUser = () => {
  const [user, setUser] = useState<User | null>(null);

  const tryRefreshToken = async () => {
    const token = PersistentStore.getKey("token");
    if (!token) return;

    try {
      const newToken = await axios.get(
        `${Config.getBackendUrl()}/auth/twitch/refresh?token=${token}`
      );
      PersistentStore.setKey("token", newToken.data);
    } catch (err) {
      PersistentStore.removeKey("token");
      console.error(err);
    } finally {
      window.location.reload();
    }
  };

  useEffect(() => {
    axios
      .get("https://api.twitch.tv/helix/users", {
        headers: {
          "Client-ID": Config.getTwitchAppClientId(),
          Authorization: `Bearer ${PersistentStore.getKey("token")}`,
        },
      })
      .then((res) => {
        setUser(res.data["data"][0]);
      })
      .catch((err) => {
        tryRefreshToken();
        console.error(err);
      });
  }, []);

  const makeVote = async (vote: string) => {
    if (!user) return;
    if (vote !== "yes" && vote !== "no") return;
    if (
      confirm(
        `Czy na pewno chcesz zagłosować na "${vote == "yes" ? "TAK" : "NIE"}"?`
      ) === false
    )
      return;

    const result = await axios.get(
      `${Config.getBackendUrl()}/vote?userId=${user.id}&vote=${vote}`
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

  const logout = () => {
    PersistentStore.removeKey("token");
    window.location.reload();
  };

  return (
    <div className="home-user">
      <div className="home-user-title">
        <img
          className="home-user-image-yoooo"
          src="https://cdn.7tv.app/emote/6139e92833f0020ec54a8339/4x.webp"
          alt="yoooo"
        />
        <h1>Witam cię bramkarzu!</h1>{" "}
        <img
          className="home-user-image-yoooo"
          src="https://cdn.7tv.app/emote/6139e92833f0020ec54a8339/4x.webp"
          alt="yoooo"
        />
      </div>
      <div className="home-user-container">
        {user && (
          <>
            <div className="home-user-container-profile">
              <img
                className="home-user-container-profile-image"
                src={user?.profile_image_url}
              />
              <h3>@{user?.display_name}</h3>
              <button onClick={logout}>Wyloguj</button>
            </div>
            <h2>Obstawiaj wynik gry Kezmana!</h2>
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
          </>
        )}
      </div>
    </div>
  );
};

export default HomeUser;
