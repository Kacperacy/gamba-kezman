import { useEffect, useState } from "react";
import { Config } from "../Config";
import axios from "axios";
import { PersistentStore } from "../util/PersistentStore";

export const AuthTwitchHandler: React.FC = () => {
  const u = new URLSearchParams(window.location.search);
  const code = u.get("code");
  const [result, setResult] = useState<string | null>(null);

  const backendUrl = Config.getBackendUrl();

  useEffect(() => {
    if (code) {
      axios
        .get(
          `${backendUrl}/api/auth/twitch/login?authCode=${code}&redirectUri=${encodeURIComponent(
            Config.getTwitchLoginRedirectUri()
          )}`
        )
        .then((res) => {
          setResult(res.data);
        })
        .catch((err) => {
          setResult("ERROR");
          console.error(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (result !== null && result !== "ERROR") {
      PersistentStore.setKey("token", result);
      window.location.href = "/";
    }
  }, [result]);

  return (
    <>
      {result === null && <div>Logowanie...</div>}
      {result === "ERROR" && <div>Wystąpił błąd podczas logowania</div>}
    </>
  );
};
