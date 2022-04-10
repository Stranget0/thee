import { useFrame } from "@react-three/fiber";
import type { NextPage } from "next";
import { useEffect, useMemo, useRef } from "react";
import { PointLight, Vector3 } from "three";
import Layout from "../components/Layout";
import AppPointLight from "../components/lib/PointLight";
import Box from "../components/objects/Box";
import Scene from "../components/Scene";
import { useMouse } from "../contexts/MouseContext";
import { usePageScroll } from "../contexts/ScrollContext";
import useWindow from "../utils/hooks/useWindow";

const Home: NextPage = () => {
  const { underMousePos } = useMouse();
  const lightRef = useRef<PointLight>();
  useEffect(() => {
    if (underMousePos && lightRef.current) {
      lightRef.current.position.x = underMousePos.x;
      lightRef.current.position.y = underMousePos.y;
    }
  }, [underMousePos]);
  return (
    <Layout>
      <Scene withHelpers>
        <AppPointLight
          withHelper
          position={[1, 1, 3]}
          ref={lightRef}
          color="white"
        />
        <Box />
      </Scene>
    </Layout>
  );
};

export default Home;
