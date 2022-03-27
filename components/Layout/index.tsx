import { ReactElement } from "react";
import styled from "styled-components";

interface Props {
  children: ReactElement;
}

const Main = styled.main`
  color: pink;
	height: 5000px;
`;

const Layout = ({ children }: Props) => {
  return (
      <Main>{children}</Main>
  );
};

export default Layout;
