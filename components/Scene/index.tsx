import { FC } from "react";
import AppCanvas from "./AppCanvas";
import AppCamera from "./AppCamera";
import Helpers from "./Helpers";
import { OrbitControls } from "@react-three/drei";

interface DebugProps {
  withHelpers?: boolean;
}

const Scene: FC<DebugProps> = ({ children, withHelpers }) => {
  return (
    <AppCanvas>
      <AppCamera />

      {/* TODO remove in prod */}

      {withHelpers && <Helpers />}
      {children}
    </AppCanvas>
  );
};

export default Scene;
