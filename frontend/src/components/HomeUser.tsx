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

const HomeUser = () => {
  const [user, setUser] = useState<User | null>(null);

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
        console.error(err);
      });
  }, []);

  const vote = (vote: string) => {
    if (!user) return;
    if (vote !== "yes" && vote !== "no") return;
    if (
      confirm(
        `Czy na pewno chcesz zagłosować na "${vote == "yes" ? "TAK" : "NO"}"?`
      ) === false
    )
      return;

    axios.get(
      `${Config.getBackendUrl()}/api/vote?userId=${user.id}&vote=${vote}`
    );
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
                alt=""
              />
              <h3>@{user?.display_name}</h3>
            </div>
            <h2>Obstawiaj czy Kezman22 zrobi bottom</h2>
            <div className="home-user-container-vote">
              <div
                onClick={() => vote("yes")}
                className="home-user-container-vote-button home-user-container-vote-button-yes"
              >
                TAK
              </div>
              <div
                onClick={() => vote("no")}
                className="home-user-container-vote-button home-user-container-vote-button-no"
              >
                NIE
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomeUser;
