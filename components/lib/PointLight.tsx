import { useHelper } from "@react-three/drei";
import { PointLightProps } from "@react-three/fiber";
import { ReactNode, useRef } from "react";
import { ColorRepresentation, PointLight, PointLightHelper } from "three";

interface Props extends PointLightProps {
  withHelper?: boolean;
  color?: ColorRepresentation;
}

const AppPointLight = ({ withHelper, ...props }: Props) => {
  const { distance, color } = props;
  const ref = useRef<PointLight>();
  useHelper(withHelper ? ref : null, PointLightHelper, distance, color);
  return <pointLight ref={ref} {...props} />;
};

export default AppPointLight;
