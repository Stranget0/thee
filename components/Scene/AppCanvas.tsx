import { Canvas } from "@react-three/fiber";
import { FC } from "react";
import styled from "styled-components";


type Props = Parameters<typeof Canvas>[0];

const AppCanvas: FC<Props> = ({ children, ...props }) => {
  return (
    <CanvasWrapper>
      <StyledCanvas {...props}>{children}</StyledCanvas>
    </CanvasWrapper>
  );
};

	const StyledCanvas = styled(Canvas)`
		background: #aaaaaa;
	`;
	const CanvasWrapper = styled.div`
		position: absolute;
		inset: 0;
	`;

export default AppCanvas;
