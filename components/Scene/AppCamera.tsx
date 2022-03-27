import { PerspectiveCamera } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { Vector3 } from "three";
import { usePageScroll } from "../../contexts/ScrollContext";
import useBezier from "../../utils/hooks/bezier";

interface Props {}

const AppCamera = ({}: Props) => {
  const scroll = usePageScroll();
  const posY = useBezier(
    -scroll / 1000,
    () => 1000,
    [.17,.67,.16,1]
  );

  return <PerspectiveCamera makeDefault position={new Vector3(0, posY, 10)} />;
};

export default AppCamera;
