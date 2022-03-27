import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { FC } from "react";
import { Vector3 } from "three";
import AppCanvas from "./AppCanvas";
import Helpers from "./Helpers";

interface DebugProps {
  withHelpers?: boolean;
}

const Scene: FC<DebugProps> = ({ children, withHelpers }) => {
  return (
    <AppCanvas>
			
			{/* TODO remove in prod */}
      {/* <OrbitControls /> */}
      
			{withHelpers && <Helpers />}
      {children}
    </AppCanvas>
  );
};

export default Scene;
