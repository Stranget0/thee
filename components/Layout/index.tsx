import { ReactElement } from "react";
import styled from "styled-components";

interface Props {
  children: ReactElement;
}

const Main = styled.main`
  color: pink;
`;

const Layout = ({ children }: Props) => {
  return <Main>{children}</Main>;
};

export default Layout;
