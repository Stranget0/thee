import { useEffect, useState } from "react";

function useWindow() {
  const [windowV, setWindow] = useState<Partial<Window>>({});
  useEffect(() => {
    function handleResize() {
      setWindow(window);
    }
    if (typeof window !== "undefined") {
      addEventListener("resize", handleResize);
      handleResize();
      return () => removeEventListener("resize", handleResize);
    }
  }, []);
  return windowV;
}

export default useWindow;
