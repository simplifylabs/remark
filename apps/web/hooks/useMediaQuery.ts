import { useState, useEffect } from "react";

export default function useMediaQuery(query: string) {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    media.addListener(listener);
    return () => media.removeListener(listener);
  }, []);

  function listener() {
    setMatches(window.matchMedia(query).matches);
  }

  return matches;
}
