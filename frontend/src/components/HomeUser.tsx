import axios from "axios";
import { useEffect, useState } from "react";
import { PersistentStore } from "../util/PersistentStore";
import { Config } from "../Config";
import "./HomeUser.css";
import Profile from "./HomeUser/Profile";
import Voting from "./HomeUser/Voting";
import TopBar from "./HomeUser/TopBar";
import Info from "./HomeUser/Info";

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

  return (
    <div className="home-user">
      <TopBar />
      <div className="home-user-container">
        {user && (
          <>
            <Profile
              profileImageUrl={user?.profile_image_url}
              displayName={user?.display_name}
            />
            <Info />
            <Voting userId={user?.id} />
          </>
        )}
      </div>
    </div>
  );
};

export default HomeUser;
