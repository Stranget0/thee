import { useHelper } from "@react-three/drei";
import { PointLightProps } from "@react-three/fiber";
import { forwardRef, ReactNode, useImperativeHandle, useRef } from "react";
import { ColorRepresentation, PointLight, PointLightHelper } from "three";

interface Props extends PointLightProps {
  withHelper?: boolean;
  color?: ColorRepresentation;
}

const AppPointLight = forwardRef<PointLight | undefined, Props>(
  ({ withHelper, ...props }, ref) => {
    const { distance, color } = props;
    const lightRef = useRef<PointLight>();
    useImperativeHandle(ref, () => lightRef.current);
    useHelper(withHelper && lightRef ? lightRef : null, PointLightHelper, distance, color);
    return <pointLight ref={lightRef} {...props} />;
  }
);
AppPointLight.displayName = "AppPointLight";
export default AppPointLight;
