import { useContextBridge } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { FC } from "react";
import styled from "styled-components";
import GlobalContexts, {
  CanvasContexts,
  contextsToBridge,
} from "../../contexts";
import { mouseContext } from "../../contexts/MouseContext";

type Props = Parameters<typeof Canvas>[0];
const AppCanvas: FC<Props> = ({ children, ...props }) => {
  return (
    <CanvasWrapper>
      <Canvas {...props}>
        <CanvasContexts>{children}</CanvasContexts>
      </Canvas>
    </CanvasWrapper>
  );
};

const CanvasWrapper = styled.div`
  position: fixed;
  inset: 0;
`;

export default AppCanvas;
