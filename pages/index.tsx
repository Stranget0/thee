import type { NextPage } from "next";
import {
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  BufferGeometry,
  CircleGeometry,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  Vector3,
} from "three";
import Layout from "../components/Layout";
import makeCube from "../utils/three-vanilla/cube";
import { makeScene, scene, useAnimate } from "../utils/three-vanilla/scene";

const Home: NextPage = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [items3d, setItems3d] = useState<Mesh[]>([]);

  useEffect(() => {
    makeScene(canvasRef.current as HTMLDivElement, 300, 300, [0, 0, 5]);
    const cube = makeCube(0x00ff00, [1, 1, 1]);
    setItems3d((items) => [...items, cube]);

    // const points = [
    //   new Vector3(-1, -1, -1),
    //   new Vector3(0, 0, 1),
    //   new Vector3(1, 1, 1),
    // ];
    // const geometry = new BufferGeometry().setFromPoints(points);
    const geometry = new CircleGeometry(0.5,12);
    const material = new MeshBasicMaterial({ color: 0xff0000 });
    const line = new Mesh(geometry, material);
		// line.rotateY(45)
    scene?.add(line);
  }, []);

  useAnimate(() => {
    const cube = items3d[0];
    if (cube) {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
    }
  });

  return (
    <Layout>
      <div ref={canvasRef}></div>
    </Layout>
  );
};

export default Home;
