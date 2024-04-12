import "./App.css";
import Home from "./components/Home";
import { PersistentStore } from "./util/PersistentStore";
import { useNavigation } from "./hooks/useNavigation";
import HomeUser from "./components/HomeUser";
import { AuthTwitchHandler } from "./components/AuthTwitchHandler";

const baseRegExp =
  /^https?:\/\/[a-zA-Z-0-9.]+:?[0-9]*([/A-Za-z0-9-_]+)\??(\S*)$/i;

function App() {
  const [path] = useNavigation();

  if (path.length > 1000) return <div>Path too long</div>;

  const token = PersistentStore.getKey("token");

  const match = path.match(baseRegExp);
  if (!match) return token ? <HomeUser /> : <Home />;

  const route = match[1];

  switch (route) {
    case "/oauth":
      return <AuthTwitchHandler />;
    default:
      return token ? <HomeUser /> : <Home />;
  }
}

export default App;
