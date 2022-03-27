import { FC } from "react";
import { ScrollProvider } from "./ScrollContext";

const Contexts: FC = ({ children }) => {
  return <ScrollProvider>{children}</ScrollProvider>;
};

export default Contexts;
