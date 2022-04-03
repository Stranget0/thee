import { PerspectiveCamera } from "@react-three/drei";
import { Vector3 } from "three";
import { usePageScroll } from "../../contexts/ScrollContext";

interface Props {}

const AppCamera = ({}: Props) => {
  const {scrollPercent:scroll} = usePageScroll();
	
  return (
    <PerspectiveCamera makeDefault position={new Vector3(0, -scroll, 10)} />
  );
};

export default AppCamera;
