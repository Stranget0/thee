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
import useBezier from "../../utils/hooks/useBezier";

function Box() {
  const ref = useRef<Mesh<BoxBufferGeometry, MeshStandardMaterial>>();
  const { clientX: mouseX = 0, clientY: mouseY = 0 } = useMouse();
  const [x, y] = useBezier([mouseX, mouseY], 300, [0, 0.5, 0.5, 1]);
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
