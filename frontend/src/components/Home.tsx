import { ReactNode } from "react";
import { Config } from "../Config";
import "./Home.css";

type HomeProps = {
  children?: ReactNode;
};

const Home = ({ children }: HomeProps) => {
  const scope = "user:read:email";

  const makeRedirectUri = (clientId: string, redirectUri: string) => {
    return `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
  };

  const doTwitchAuth = async () => {
    window.location.href = makeRedirectUri(
      Config.getTwitchAppClientId(),
      Config.getTwitchAppRedirectUri()
    );
  };

  return (
    <div className="home">
      <div className="home-title">
        <h1>GAMBA KEZMANA - GK</h1>
        <h2>Zgaduj które miejsce zajmie Kezman</h2>
      </div>
      <div className="home-container">
        {children && children}
        {!children && (
          <button className="home-twitch-button" onClick={doTwitchAuth}>
            Zaloguj przez Twitch
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
