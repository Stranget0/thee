import { throttle } from "lodash";
import {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { scrollBezierPoints } from "../types/global";
import useBezier from "../utils/hooks/useBezier";
import useIsomorphicEffect from "../utils/hooks/useIsomorphicEffect";

const initialValue = { scroll: 0, scrollPercent: 0, target: 0 };
const scrollContext = createContext(initialValue);

export const ScrollProvider: FC<{ duration?: number; throttleMs?: number }> = ({
  children,
  throttleMs,
  duration,
}) => {
  const [target, setTarget] = useState(0);
  const [docHeight, setDocHeight] = useState(0);
  useIsomorphicEffect(() => {
    const { clientHeight, scrollHeight } = document.documentElement;
    setDocHeight(scrollHeight - clientHeight);
  }, []);

  useEffect(() => {
    const updateTarget = throttle(() => setTarget(window.scrollY), throttleMs);
    updateTarget();
    addEventListener("scroll", updateTarget);
    return () => removeEventListener("scroll", updateTarget);
  }, [throttleMs]);

  const scroll = useBezier(target, duration ?? 0, scrollBezierPoints);
  const scrollPercent = scroll / docHeight;
  // XXX use this if performance is hurt
  // const scrollData = useMemo(
  //   () => ({ scroll, scrollPercent, target }),
  //   [scroll, scrollPercent, target]
  // );
  return (
    <scrollContext.Provider value={{ scroll, scrollPercent, target }}>
      {children}
    </scrollContext.Provider>
  );
};

export const usePageScroll = () => {
  const scrollData = useContext(scrollContext);
  return scrollData;
};
