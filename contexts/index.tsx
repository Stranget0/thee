import { FC } from "react";
import { MouseProvider } from "./MouseContext";
import { ScrollProvider } from "./ScrollContext";

const GlobalContexts: FC = ({ children }) => {
  return (
    <ScrollProvider duration={700} throttleMs={50}>
      <MouseProvider>{children}</MouseProvider>
    </ScrollProvider>
  );
};

export default GlobalContexts;
