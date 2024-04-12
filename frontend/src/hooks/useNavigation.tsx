import { useState } from "react";

export const useNavigation: () => [string, (route: string) => void] = () => {
  const [path, setPath] = useState(window.location.href);

  window.addEventListener("popstate", () => {
    setPath(window.location.href);
  });

  const doNavigation = (route: string) => {
    window.history.pushState({}, "", route);
  };

  return [path, doNavigation];
};
