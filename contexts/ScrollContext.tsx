import {
  createContext,
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { throttle, ThrottleSettings } from "lodash";
import useBezier from "../utils/hooks/bezier";
import { pageScrollBezier, pageScrollMs } from "../globals";

const ms = 100;
const options: ThrottleSettings = { trailing:true};
const scrollContext = createContext<null | number>(null);

export const ScrollProvider: FC = ({ children }) => {
  const [scroll, setScroll] = useState(0);

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

  const posY = useBezier(-scroll * 10, pageScrollMs, pageScrollBezier, {
    // TODO make adaptive
    minChange: 0.001,
  });

  return (
    <scrollContext.Provider value={posY}>{children}</scrollContext.Provider>
  );
};
export const usePageScroll = () => useContext(scrollContext) ?? 0;
