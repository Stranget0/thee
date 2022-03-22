import { Vector3, Vector3Tuple } from "three";

export default function setVector(
  targetVector: Vector3,
  toVector: Vector3Tuple
):void {
  targetVector.x = toVector[0];
  targetVector.y = toVector[1];
  targetVector.z = toVector[2];
}
