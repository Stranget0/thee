import { Canvas } from "@react-three/fiber";
import { FC } from "react";
import styled from "styled-components";
import GlobalContexts from "../../contexts";

type Props = Parameters<typeof Canvas>[0];

const AppCanvas: FC<Props> = ({ children, ...props }) => {
  return (
    <CanvasWrapper>
      <Canvas {...props}>
        <GlobalContexts>{children}</GlobalContexts>
      </Canvas>
    </CanvasWrapper>
  );
};

const CanvasWrapper = styled.div`
  position: fixed;
  inset: 0;
`;

export default AppCanvas;
