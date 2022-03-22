import { Camera } from "@react-three/fiber";
import { useEffect, useLayoutEffect } from "react";
import {
  PerspectiveCamera,
  Scene,
  Vector3,
  Vector3Tuple,
  WebGLRenderer,
} from "three";
import setVector from "./setVector";

export let scene: null | Scene = null;
export let camera: null | PerspectiveCamera = null;
export let renderer: null | WebGLRenderer = null;

function animate(updateFunc: VoidFunction) {
  let shouldContinue = true;
  if (shouldContinue) {
    updateFunc();
		requestAnimationFrame(() => animate(updateFunc));
    if (camera && scene) renderer?.render(scene, camera);
  }
  return () => {
    shouldContinue = false;
  };
}

export const useAnimate = (updateFunc: Parameters<typeof animate>[0]) => {
  useLayoutEffect(() => animate(updateFunc), [updateFunc]);
};

export function makeScene(
  target: HTMLElement,
  width = window.innerWidth,
  height = window.innerHeight,
  cameraPos?: Vector3Tuple
  // cameraRot?: Vector3Tuple,
) {
  scene = new Scene();
  camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
  renderer = new WebGLRenderer();
  renderer.setSize(width, height);
  target.appendChild(renderer.domElement);
  cameraPos && setVector(camera.position, cameraPos);
  // cameraRot && setVector(camera.rotation, cameraRot)
}
