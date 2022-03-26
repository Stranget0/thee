import { Vector3 } from "three";

interface Props {
  gridSize?: number;
}

const Helpers = ({ gridSize = 10 }: Props) => {
  return (
    <>
      <axesHelper position={new Vector3(0, 0.01, 0)} />
      <gridHelper args={[gridSize, gridSize, "pink", "gray"]} />
    </>
  );
};

export default Helpers;
