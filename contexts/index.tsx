import { useContextBridge } from "@react-three/drei";
import { FC } from "react";
import { mouseContext, MouseProvider } from "./MouseContext";
import { scrollContext, ScrollProvider } from "./ScrollContext";

const GlobalContexts: FC = ({ children }) => (
  <ScrollProvider>
    <MouseProvider>{children}</MouseProvider>
  </ScrollProvider>
);

export const contextsToBridge = [mouseContext];
export const CanvasContexts: FC = ({ children }) => {
  // const ContextBridge = useContextBridge(...contextsToBridge);
	return (
    <ScrollProvider>
      <MouseProvider>
        {/* <ContextBridge> */}
					{children}
					{/* </ContextBridge> */}
      </MouseProvider>
    </ScrollProvider>
  );
};

export default GlobalContexts;
