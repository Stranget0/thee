import { throttle } from "lodash";
import {
  createContext,
  FC,
  MouseEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";

interface Props {
  throttleMs?: number;
}

const initialValue: Partial<MouseEvent> = {};
const mouseContext = createContext(initialValue);

export const MouseProvider: FC<Props> = ({ children, throttleMs }) => {
  const [mouse, setMouse] = useState(initialValue);
	
  useEffect(() => {
    const update = throttle((e: MouseEvent) => setMouse(e), throttleMs);
    addEventListener("mousemove", update);
    return () => {removeEventListener("mousemove", update)};
  }, [throttleMs]);

  return (
    <mouseContext.Provider value={mouse}>{children}</mouseContext.Provider>
  );
};

/** Get client mouse data */
export const useMouse = () => useContext(mouseContext);
