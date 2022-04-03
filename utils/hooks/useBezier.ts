import bezier from "bezier-easing";
import { useEffect, useState } from "react";
import { BezierPoints } from "../../types/global";

const updateValue = (to: number, startPos: number, progress: number) =>
  startPos + (to - startPos) * progress;

function useBezier<T extends number | number[]>(
  target: T,
  duration: number,
  points: BezierPoints
): T {
  const [value, setValue] = useState(target);

  useEffect(() => {
    const easing = bezier(...points);
    const timeStart = Date.now();
    let frameId = requestAnimationFrame(frame);
    let startPos = value;
    function frame() {
      if (!duration) return setValue(target);
      const timeNow = Date.now();
      const progress = (timeNow - timeStart) / duration;
      const easedProgress = easing(progress);
      let newValue;
      if (typeof target === "number")
        newValue = updateValue(target, startPos as number, easedProgress);
      else
        newValue = target.map((t, i) =>
          updateValue(t, (startPos as number[])[i], progress)
        );

      setValue(newValue as T);
      if (Date.now() < timeStart + duration)
        frameId = requestAnimationFrame(frame);
    }
    return () => cancelAnimationFrame(frameId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, target, ...points]);

  return value;
}

export default useBezier;
