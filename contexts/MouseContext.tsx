import { Camera } from "@react-three/fiber";
import { throttle } from "lodash";
import {
  createContext,
  FC,
  Reducer,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Raycaster, Vector3 } from "three";
import { Action } from "../types/global";
import { usePageScroll } from "./ScrollContext";

interface Props {
  throttleMs?: number;
}

interface State {
  x: number;
  y: number;
  underMousePos?: Vector3;
  setCamera: (camera: Camera) => void;
  raycaster: Raycaster;
}

type Actions =
  | Action<"setInitialState", State["setCamera"]>
  | Action<
      "updatePointer",
      { e: MouseEvent; camera?: Camera; offset?: Vector3 }
    >;

// type MouseReducer<T extends keyof Actions> = Reducer<State, Action<T>>;
const reducer: Reducer<State, Actions> = (state, action) => {
  switch (action.type) {
    case "setInitialState": {
      const setCamera = action.payload;
      const raycaster = new Raycaster();
      return { ...state, setCamera, raycaster };
    }
    case "updatePointer": {
      const { camera, offset } = action.payload;
      const { clientX, clientY } = action.payload.e;
      const { innerWidth, innerHeight } = window;
      const underMousePos = new Vector3();
      const cameraVector = new Vector3(
        (clientX / innerWidth) * 2 - 1,
        -(clientY / innerHeight) * 2 + 1,
        0
      );
      if (camera && window) {
        // console.log("init", { cameraVector });
        cameraVector.unproject(camera);
        // console.log("unproject", { cameraVector, camera: camera.position });
        cameraVector.sub(camera.position).normalize();
        // console.log("sub", { cameraVector, camera: camera.position });
        const distance = -camera.position.z / cameraVector.z;
        // console.log("distance", distance, camera.position.z, cameraVector.z);
        underMousePos
				.copy(camera.position)
				.add(cameraVector.multiplyScalar(distance));
        if (offset) underMousePos.add(offset);
      }

      return { ...state, x: clientX, y: clientY, underMousePos };
    }
  }
};
const initialState: State = {
  x: 0,
  y: 0,
  setCamera: () => {},
  raycaster: new Raycaster(),
};

export const mouseContext = createContext<State>(initialState);

export const MouseProvider: FC<Props> = ({ children, throttleMs }) => {
	const [camera, setCamera] = useState<Camera>();
  const [mouse, dispatch] = useReducer(reducer, initialState);
  const { scrollPercent } = usePageScroll();
  useEffect(() => {
		dispatch({
			type: "setInitialState",
      payload: setCamera as State["setCamera"],
    });
  }, []);
	
  useEffect(() => {
		const offset = new Vector3(0, -scrollPercent);
    const update = throttle((e: MouseEvent) => {
      dispatch({ type: "updatePointer", payload: { e, camera, offset } });
    }, throttleMs);
    addEventListener("mousemove", update);
    return () => {
      removeEventListener("mousemove", update);
    };
  }, [camera, scrollPercent, throttleMs]);

  return (
    <mouseContext.Provider value={mouse}>{children}</mouseContext.Provider>
  );
};

/** Get client mouse data */
export const useMouse = () => useContext(mouseContext);
