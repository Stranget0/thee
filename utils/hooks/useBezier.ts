import bezier from "bezier-easing";
import { useEffect, useMemo, useRef, useState } from "react";
import { BezierPoints } from "../../types/global";

function useBezier(target: number, duration: number, points: BezierPoints) {
  const [value, setValue] = useState(target);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const easing = useMemo(() => bezier(...points), points);

  useEffect(() => {
    const easing = bezier(...points);
    const timeStart = Date.now();
    let frameId = requestAnimationFrame(frame);
    let startPos = value;
    function frame() {
      const timeNow = Date.now();
      const progress = (timeNow - timeStart) / duration;
      const easedProgress = easing(progress);
      let newValue = startPos + easedProgress * (target - startPos);
      setValue(newValue);
      if (Date.now() < timeStart + duration)
        frameId = requestAnimationFrame(frame);
    }
    return () => cancelAnimationFrame(frameId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, target]);

  return value;
}

export default useBezier;
