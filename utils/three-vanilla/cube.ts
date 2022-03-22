import {
  BoxGeometry,
  ColorRepresentation,
  Mesh,
  MeshBasicMaterial,
  Vector3Tuple,
} from "three";
import { scene } from "./scene";
import setVector from "./setVector";

export default function makeCube(
  color: ColorRepresentation,
  pos?: Vector3Tuple
): Mesh<BoxGeometry, MeshBasicMaterial> {
  const geometry = new BoxGeometry();
  const material = new MeshBasicMaterial({ color });
  const cube = new Mesh(geometry, material);
  pos && setVector(cube.position, pos);
  scene?.add(cube);
  return cube;
}
