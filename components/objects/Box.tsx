import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import {
  BoxBufferGeometry,
} from "three";

function Box() {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef<BoxBufferGeometry>();
  const [hovered, hover] = useState(false);

  return (
    <mesh>
      <boxBufferGeometry ref={ref} args={[1, 1, 1, 10, 10, 10]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}
export default Box;
