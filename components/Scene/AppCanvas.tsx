import { Canvas } from "@react-three/fiber";
import { FC } from "react";
import styled from "styled-components";

type Props = Parameters<typeof Canvas>[0];

const AppCanvas: FC<Props> = ({ children, ...props }) => {
  return (
    <CanvasWrapper>
      <Canvas {...props}>{children}</Canvas>
    </CanvasWrapper>
  );
};

const CanvasWrapper = styled.div`
  position: fixed;
  inset: 0;
`;

export default AppCanvas;
