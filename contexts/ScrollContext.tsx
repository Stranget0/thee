import {
  createContext,
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { throttle, ThrottleSettings } from "lodash";

const ms = 250;
const options: ThrottleSettings = { trailing:true};
const scrollContext = createContext<null | number>(null);

export const ScrollProvider: FC = ({ children }) => {
  const [scroll, setScroll] = useState<null | number>(null);

  useEffect(() => {
    const updateScroll = throttle(
      () => {
        // prettier-ignore
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        const maxScroll = scrollHeight - clientHeight;
        const newScroll = scrollTop / maxScroll;
        setScroll(newScroll);
      },
      ms,
      options
    );
    addEventListener("scroll", updateScroll);
    return () => removeEventListener("scroll", updateScroll);
  }, []);
  return (
    <scrollContext.Provider value={scroll}>{children}</scrollContext.Provider>
  );
};
export const usePageScroll = () => useContext(scrollContext) ?? 0;
