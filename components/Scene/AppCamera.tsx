import { PerspectiveCamera } from "@react-three/drei";
import { Camera } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { useMouse } from "../../contexts/MouseContext";
import { usePageScroll } from "../../contexts/ScrollContext";
import { sceneHeight } from "../../types/global";

interface Props {}

const AppCamera = ({}: Props) => {
  const { scrollPercent } = usePageScroll();
  const { setCamera } = useMouse();
  const ref = useRef<Camera>();
	
  useEffect(() => {
    if (ref.current) setCamera(ref.current);
  }, [setCamera, scrollPercent]);
  return (
    <PerspectiveCamera
      makeDefault
      ref={ref}
      position={new Vector3(0, scrollPercent * -sceneHeight, 10)}
    />
  );
};

export default AppCamera;
