import { createContext, FC, useContext, useEffect, useState } from "react";
import { throttle, ThrottleSettings } from "lodash";

const ms = 150;
const options: ThrottleSettings = { leading: true };
const scrollContext = createContext<null | number>(null);

export const ScrollProvider: FC = ({ children }) => {
  const [scroll, setScroll] = useState<null | number>(null);

  useEffect(() => {
    const updateScroll = throttle(() => setScroll(window.scrollY), ms, options);
    addEventListener("scroll", updateScroll);
    return () => removeEventListener("scroll", updateScroll);
  }, []);
  return (
    <scrollContext.Provider value={scroll}>{children}</scrollContext.Provider>
  );
};
export const usePageScroll = () => useContext(scrollContext) ?? 0;
