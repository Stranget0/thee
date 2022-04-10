import { useEffect, useRef, useState } from "react";
import {
  BoxBufferGeometry,
  Euler,
  Matrix4,
  Mesh,
  MeshStandardMaterial,
  Quaternion,
  Vector3,
} from "three";
import { degToRad } from "three/src/math/MathUtils";
import { useMouse } from "../../contexts/MouseContext";
import { usePageScroll } from "../../contexts/ScrollContext";
import { BezierPointsTuple } from "../../types/global";
import useBezier from "../../utils/hooks/useBezier";

const bezier: BezierPointsTuple = [0,0,0,1];

function Box() {
  const ref = useRef<Mesh<BoxBufferGeometry, MeshStandardMaterial>>();
  const { x: mouseX, y: mouseY } = useMouse();
	
  const [x, y] = useBezier([mouseX, mouseY], 1000, bezier);
  const { scroll } = usePageScroll();
  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      if (!ref.current) return;
      ref.current.setRotationFromEuler(
        new Euler((y + scroll * 5) / 2000, x / 2000)
      );
    });
    return () => cancelAnimationFrame(frameId);
  }, [scroll, x, y]);
  return (
    <mesh ref={ref}>
      <boxBufferGeometry args={[1, 1, 1, 10, 10, 10]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}
export default Box;
