import { createContext, FC, useContext, useEffect, useState } from "react";
import { DebounceSettings, debounce } from "lodash";

const scrollContext = createContext<null | number>(null);
const debounceMs = 150;
const debounceOptions: DebounceSettings = { leading: true };

export const ScrollProvider: FC = ({ children }) => {
  const [scroll, setScroll] = useState<null | number>(null);
  useEffect(() => {
    const updateScroll = debounce(
      () => setScroll(window.scrollY),
      debounceMs,
      debounceOptions
    );
    addEventListener("scroll", updateScroll);
    return () => removeEventListener("scroll", updateScroll);
  }, []);
  return (
    <scrollContext.Provider value={scroll}>{children}</scrollContext.Provider>
  );
};
export const usePageScroll = () => useContext(scrollContext) ?? window.scrollY;
