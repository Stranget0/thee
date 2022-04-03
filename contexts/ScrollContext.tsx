import { throttle } from "lodash";
import {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import useBezier from "../utils/hooks/useBezier";
import useIsomorphicEffect from "../utils/hooks/useIsomorphicEffect";

const initialValue = { scroll: 0, scrollPercent: 0, target: 0 };
const scrollContext = createContext(initialValue);

export const ScrollProvider: FC<{ duration?: number; throttleMs?: number }> = ({
  children,
  throttleMs = 150,
  duration = 750,
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

  const scroll = useBezier(target, duration, [0, 0.1, 0.1, 1]);
  const scrollPercent = scroll / docHeight;
	// TODO use this if performance is hurt
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
