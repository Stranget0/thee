import { ReactElement } from "react";
import styled, { ThemedStyledFunction } from "styled-components";

interface Props {
  children: ReactElement;
}

const Main = styled.main`
  color: pink;
  height: 5000px;
`;
const StyledScroll = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 60px;
	background-color: rosybrown;
`;

const Layout = ({ children }: Props) => {
  return (
    <Main>
      {children}
			<StyledScroll id="scroll" />
    </Main>
  );
};

export default Layout;
