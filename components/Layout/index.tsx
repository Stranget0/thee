import { ReactElement } from "react";

interface Props {
  children: ReactElement;
}

const Layout = ({ children }: Props) => {
  return <main>{children}</main>;
};

export default Layout;
