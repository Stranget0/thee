import { Canvas } from "@react-three/fiber";
import type { NextPage } from "next";
import Layout from "../components/Layout";
import AppPointLight from "../components/lib/PointLight";
import Box from "../components/objects/Box";
import Scene from "../components/Scene";

const Home: NextPage = () => {
  return (
    <Layout>
      <Scene withHelpers>
        <AppPointLight withHelper position={[1, 0, 1]} color="white" />
        <Box />
      </Scene>
    </Layout>
  );
};

export default Home;
