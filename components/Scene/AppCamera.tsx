import { PerspectiveCamera } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { Vector3 } from "three";
import { usePageScroll } from "../../contexts/ScrollContext";
import { pageScrollBezier, pageScrollMs } from "../../globals";
import useBezier from "../../utils/hooks/bezier";

interface Props {}

const AppCamera = ({}: Props) => {
  const scroll = usePageScroll();

  return (
    <PerspectiveCamera makeDefault position={new Vector3(0, scroll, 10)} />
  );
};

export default AppCamera;
